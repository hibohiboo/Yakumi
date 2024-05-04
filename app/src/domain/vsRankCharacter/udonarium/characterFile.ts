import { CharacterSheetDetailsProp } from '@yakumi-app/domain/spreadSheet/sheetToCharacter/types';
import { createCharacterBlock } from '@yakumi-app/domain/spreadSheet/sheetToCharacter/udonarium/crateCharacterBlock';
import { getDoc } from '@yakumi-app/domain/udonarium/common';
import {
  convertDocToXML,
  createElement,
} from '@yakumi-app/domain/udonarium/fileArchiver';
import { createChatPalleteText } from '../chatpallete/createText';
import { CharacterSheetPropsCard } from '../types';

const createXML = (xmlName: string, doc: XMLDocument) => {
  const sXML = convertDocToXML(doc);
  return new File([sXML], `${xmlName}.xml`, { type: 'text/plain' });
};
const createCharacterRootElement = (doc: XMLDocument) => {
  const char = createElement(doc, 'character', [
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

const createChatPallteBlock = (
  doc: XMLDocument,
  params: CharacterSheetDetailsProp[],
  cards: CharacterSheetPropsCard[],
) => {
  const text = `${createChatPalleteText(cards)}
${params.flatMap((p) => p.items.map((i) => `//${i.name}=${i.value}`)).join('\n')}`;
  const data = createElement(doc, 'chat-palette', [['dicebot', '']], text);
  return data;
};

export const createCharacter = (
  name: string,
  params: CharacterSheetDetailsProp[],
  imageIdentifier: string,
  cards: CharacterSheetPropsCard[],
) => {
  const doc = getDoc();
  const root = createCharacterRootElement(doc);
  const character = createCharacterBlock(doc, name, params, imageIdentifier);
  const chatPalette = createChatPallteBlock(doc, params, cards);
  root.appendChild(character);
  root.appendChild(chatPalette);
  doc.appendChild(root);
  const xml = createXML(name, doc);
  return xml;
};
