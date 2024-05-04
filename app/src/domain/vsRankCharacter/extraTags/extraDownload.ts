import { calcSHA256Async } from '@yakumi-app/domain/udonarium/FileReaderUtil';
import { createZip, getDoc } from '@yakumi-app/domain/udonarium/common';
import { createElement } from '@yakumi-app/domain/udonarium/fileArchiver';
import {
  createCardWithProp,
  createXML,
} from '@yakumi-app/domain/udonarium/udonariumZip';
import { ExtraTag } from '../types';

const getImage = async (filename: string) => {
  const res = await fetch(filename, {
    mode: 'cors',
  });

  const blob = await res.blob();

  const identifier = await calcSHA256Async(blob);
  return {
    file: new File([blob], `${identifier}.png`, {
      type: blob.type,
    }),
    identifier,
  };
};

export const createToken = async (extraTag: ExtraTag) => {
  const ex = await getImage(extraTag.icon);
  const doc = getDoc();
  const card = createCardWithProp(
    doc,
    `${extraTag.type}：${extraTag.value}`,
    ex.identifier,
    ex.identifier,
    [
      {
        title: extraTag.type,
        props: [
          { label: extraTag.value, value: extraTag.effect, type: 'note' },
        ],
      },
    ],
    '0',
    '1',
  );
  const xml = createXML(extraTag.id, doc, card);
  const ret = [ex.file, xml];
  if (extraTag.type === '■地形') {
    const terrain = createTerrain(extraTag, ex.identifier);
    ret.push(terrain);
  }
  return ret;
};

export const extraDownload = async () => {
  const extraTag: ExtraTag = {
    id: 'greese',
    type: '■地形',
    value: '滑る床',
    effect: 'この地形から動くとき移動マスを-2(最低1)する',
    icon: 'icons/poison-bottle.png',
  };

  const tokens = await createToken(extraTag);

  await createZip(tokens, 'トークン名');
};
function createTerrainRootElement(doc: XMLDocument) {
  const char = createElement(doc, 'terrain', [
    ['isLocked', 'false'],
    ['mode', '3'],
    ['rotate', '0'],
    ['location.name', 'table'],
    ['location.x', '0'],
    ['location.y', '0'],

    ['posZ', '0'],
  ]);
  return char;
}

function createTerrain(extraTag: ExtraTag, identifier: string) {
  const terrainDoc = getDoc();
  const terrainRoot = createTerrainRootElement(terrainDoc);
  const terrainData = createElement(terrainDoc, 'data', [['name', 'terrain']]);
  const terrainImage = createElement(terrainDoc, 'data', [['name', 'image']]);
  terrainImage.appendChild(
    createElement(
      terrainDoc,
      'data',
      [
        ['type', 'image'],
        ['name', 'floor'],
      ],
      identifier,
    ),
  );
  const terrainCommon = createElement(terrainDoc, 'data', [['name', 'common']]);
  terrainCommon.appendChild(
    createElement(terrainDoc, 'data', [['name', 'name']], extraTag.value),
  );
  terrainCommon.appendChild(
    createElement(terrainDoc, 'data', [['name', 'width']], '1'),
  );
  terrainCommon.appendChild(
    createElement(terrainDoc, 'data', [['name', 'height']], '0'),
  );
  terrainCommon.appendChild(
    createElement(terrainDoc, 'data', [['name', 'depth']], '1'),
  );
  terrainData.appendChild(terrainImage);
  terrainData.appendChild(terrainCommon);
  terrainRoot.appendChild(terrainData);
  return createXML(`${extraTag.id}_terrain`, terrainDoc, terrainRoot);
}
