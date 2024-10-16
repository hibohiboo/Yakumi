import { CharacterExtraTag } from '@yakumi-app/domain/vsRankCharacter/types';
import {
  CharacterSheetDetailsProp,
  CharacterSheetPropsCard,
} from '@yakumi-components/components/vsRankedMatch/CharacterPreviwer/types';
const CHARACTER_KEY = 'FALLMAGIA_CHARACTER_KEY';
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
export const setCharacter = (item: SaveFallMagiaCharacterArgs): void => {
  localStorage.setItem(CHARACTER_KEY, JSON.stringify(item));
};

export const saveCharacter = async (args: SaveFallMagiaCharacterArgs) => {
  // const id = args.characterId;
  // // 保存処理を非同期にする(putがよく失敗するため。サーバ側でBlobトリガーでの保存に切り替え
  // setTimeout(async () => {
  //   const ret = await putCharacter({
  //     id,
  //     uid: args.uid,
  //     data: JSON.stringify(args),
  //   });
  //   if (ret.status !== 200) console.warn('Failed to save character');
  //   // if (ret.status !== 200) throw new Error('Failed to save character');
  // }, 0);

  return setCharacter(args);
};

export const getCharacter = (): SaveFallMagiaCharacterArgs | null => {
  const local = localStorage.getItem(CHARACTER_KEY);
  if (!local) {
    return null;
  }
  return JSON.parse(local);
};
