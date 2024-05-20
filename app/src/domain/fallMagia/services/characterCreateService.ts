import { createCharacterId } from '@yakumi-app/domain/vsRankCharacter/persistent/characterId';
import { postMagiaNames, preMagiaNames } from './constants';
import {
  SaveFallMagiaCharacterArgs,
  getCharacter,
  setCharacter,
} from './persistent/saveCharacter';
import { scene4SelectItems } from './scene4Items';

export const createMagiaName = (): string => {
  preMagiaNames;
  postMagiaNames;

  // preとpostの名前をランダムに選んで一つの名前にする
  const preName =
    preMagiaNames[Math.floor(Math.random() * preMagiaNames.length)];
  const postName =
    postMagiaNames[Math.floor(Math.random() * postMagiaNames.length)];
  return `${preName}${postName}`;
};

export const readCharacterData = (): SaveFallMagiaCharacterArgs => {
  const character = getCharacter();
  if (character) {
    return character;
  }
  const newChar = {
    characterId: createCharacterId(),
    uid: '',
    name: createMagiaName(),
    faction: scene4SelectItems[0].tag,
    src: '',
    memo: '',
    cards: [],
    props: [],
    extraTags: [],
  };
  setCharacter(newChar);
  return newChar;
};
