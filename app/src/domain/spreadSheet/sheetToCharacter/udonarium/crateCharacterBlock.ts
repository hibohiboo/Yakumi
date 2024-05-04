import { createElement } from '@yakumi-app/domain/udonarium/fileArchiver';
import { CharacterSheetDetailsProp } from '../types';

const createImageBlock = (doc: XMLDocument, imageIdentifier: string) => {
  const root = createElement(doc, 'data', [['name', 'image']]);
  const el = createElement(
    doc,
    'data',
    [
      ['type', 'image'],
      ['name', 'imageIdentifier'],
    ],
    imageIdentifier,
  );
  root.appendChild(el);
  return root;
};

const createCommonBlock = (
  doc: XMLDocument,
  name: string,
  size: string = '1',
) => {
  const common = createElement(doc, 'data', [['name', 'common']]);
  const nameElement = createElement(doc, 'data', [['name', 'name']], name);
  const sizeElement = createElement(doc, 'data', [['name', 'size']], size);
  common.appendChild(nameElement);
  common.appendChild(sizeElement);
  return common;
};

const createDetailsBlock = (
  doc: XMLDocument,
  details: CharacterSheetDetailsProp[],
) => {
  const root = createElement(doc, 'data', [['name', 'detail']]);
  details.forEach((detail) => {
    const detailElement = createElement(doc, 'data', [['name', detail.name]]);
    detail.items.forEach((item) => {
      const attributes: [string, string][] = [['name', item.name]];
      if (item.sheetPropsResourceType) {
        attributes.push(['type', item.sheetPropsResourceType]);
      }
      if (item.sheetPropsResourceType === 'numberResource') {
        attributes.push(['currentValue', `${item.currentValue || item.value}`]);
      }

      detailElement.appendChild(
        createElement(doc, 'data', attributes, item.value),
      );
    });
    root.appendChild(detailElement);
  });

  return root;
};

export const createCharacterBlock = (
  doc: XMLDocument,
  characterName: string,
  details: CharacterSheetDetailsProp[],
  imageIdentifier: string,
) => {
  const root = createElement(doc, 'data', [['name', 'character']]);
  root.appendChild(createImageBlock(doc, imageIdentifier));
  root.appendChild(createCommonBlock(doc, characterName));
  root.appendChild(createDetailsBlock(doc, details));
  return root;
};
