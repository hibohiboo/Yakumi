import { Settings, TextImageCard } from '@yakumi-app/domain/card/types';
import { canvasToFile } from '@yakumi-app/domain/udonarium/canvas';
import { getDoc } from '@yakumi-app/domain/udonarium/common';
import { createElement } from '@yakumi-app/domain/udonarium/fileArchiver';
import { createXML } from '@yakumi-app/domain/udonarium/udonariumZip';
import html2canvas from 'html2canvas';

const createDiceSymbolRootElement = (doc: XMLDocument) => {
  const char = createElement(doc, 'dice-symbol', [
    ['face', '1'],
    ['location.name', 'table'],
    ['location.x', '500'],
    ['location.y', '50'],
    ['posZ', '0'],
    ['rotate', '0'],
    ['roll', '0'],
    ['zindex', '0'],
  ]);
  return char;
};

export const createDiceSymbol = async (
  refList: React.RefObject<HTMLDivElement>[],
  items: TextImageCard[],
  setting: Settings,
) => {
  const doc = getDoc();
  const root = createDiceSymbolRootElement(doc);
  const dyce = createElement(doc, 'data', [['name', 'dice-symbol']]);
  const image = createElement(doc, 'data', [['name', 'image']]);
  const images = await Promise.all(
    items.map(async (item, i) => {
      const ref = refList[i];
      const canvas = await html2canvas(ref.current!);
      const img = await canvasToFile(canvas);
      const el = createElement(
        doc,
        'data',
        [
          ['type', 'image'],
          ['name', `${i + 1}`],
          ['itemName', `${item.name}`],
        ],
        img.identifier,
      );
      image.appendChild(el);
      return {
        file: img.file,
      };
    }),
  );
  root.appendChild(dyce);
  dyce.appendChild(image);
  const common = createElement(doc, 'data', [['name', 'common']]);
  common.appendChild(
    createElement(doc, 'data', [['name', 'name']], setting.deckName),
  );
  common.appendChild(
    createElement(doc, 'data', [['name', 'size']], `${setting.size}`),
  );
  dyce.appendChild(common);
  dyce.appendChild(createElement(doc, 'data', [['name', 'detail']]));

  const xml = createXML(setting.deckName, doc, root);
  return { xml, files: images.map((f) => f.file) };
};
