import { putCharacter } from '@yakumi-app/domain/api/crud';
import { CharacterExtraTag } from '@yakumi-app/domain/vsRankCharacter/types';
import {
  CharacterSheetDetailsProp,
  CharacterSheetPropsCard,
} from '@yakumi-components/components/vsRankedMatch/CharacterPreviwer/types';

export interface SaveFallMagiaCharacterArgs {
  characterId: string;
  uid: string;
  name: string;
  src: string;
  faction: string;
  cards: CharacterSheetPropsCard[];
  props: CharacterSheetDetailsProp[];
  extraTags: CharacterExtraTag[];
  memo: string;
}

export const saveCharacter = async (args: SaveFallMagiaCharacterArgs) => {
  const id = args.characterId;
  const ret = await putCharacter({
    id,
    uid: args.uid,
    data: JSON.stringify(args),
  });
  if (ret.statusText !== 'OK') throw new Error('Failed to save character');
  return setCharacter(args);
};
const CHARACTER_KEY = 'FALLMAGIA_CHARACTER_KEY';
export const getCharacter = (): SaveFallMagiaCharacterArgs | null => {
  const local = localStorage.getItem(CHARACTER_KEY);
  if (!local) {
    return null;
  }
  return JSON.parse(local);
};

export const setCharacter = (item: SaveFallMagiaCharacterArgs): void => {
  localStorage.setItem(CHARACTER_KEY, JSON.stringify(item));
};
