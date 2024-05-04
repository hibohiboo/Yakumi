import { putCharacter } from '@yakumi-app/domain/api/crud';
import {
  CharacterSheetDetailsProp,
  CharacterSheetPropsCard,
} from '@yakumi-components/components/vsRankedMatch/CharacterPreviwer/types';
import { CharacterExtraTag, CharacterIdListItem } from '../types';

export interface SaveCharacterArgs {
  characterId: string;
  uid: string;
  name: string;
  src: string;
  cards: CharacterSheetPropsCard[];
  props: CharacterSheetDetailsProp[];
  extraTags: CharacterExtraTag[];
}

export const saveCharacter = async (args: SaveCharacterArgs) => {
  const id = args.characterId;
  const ret = await putCharacter({
    id,
    uid: args.uid,
    data: JSON.stringify(args),
  });
  if (ret.statusText !== 'OK') throw new Error('Failed to save character');
  return setCharacterIdList({ id, name: args.name });
};
const CHARACTER_LIST_KEY = 'CHARACTER_LIST_KEY';
export const getCharacterIdList = (): CharacterIdListItem[] => {
  const local = localStorage.getItem(CHARACTER_LIST_KEY);
  if (!local) {
    return [];
  }
  return JSON.parse(local);
};

export const setCharacterIdList = (
  item: CharacterIdListItem,
): CharacterIdListItem[] => {
  const oldList = getCharacterIdList();
  const list = [item, ...oldList.filter((i) => i.id !== item.id)];
  localStorage.setItem(CHARACTER_LIST_KEY, JSON.stringify(list));
  return list;
};
