import { getDoc } from '../../../udonarium/common';
import {
  convertDocToXML,
  createElement,
} from '../../../udonarium/fileArchiver';
import { CharacterSheetDetailsProp } from '../types';
import { createCharacterBlock } from './crateCharacterBlock';

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

const createChatPallteBlock = (doc: XMLDocument) => {
  const data = createElement(doc, 'chat-palette', [['dicebot', '']]);
  return data;
};
export const createCharacter = (
  name: string,
  params: CharacterSheetDetailsProp[],
  imageIdentifier: string,
) => {
  const doc = getDoc();
  const root = createCharacterRootElement(doc);
  const character = createCharacterBlock(doc, name, params, imageIdentifier);
  const chatPalette = createChatPallteBlock(doc);
  root.appendChild(character);
  root.appendChild(chatPalette);
  doc.appendChild(root);
  const xml = createXML(name, doc);
  return xml;
};
