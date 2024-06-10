/* eslint-disable @typescript-eslint/no-explicit-any */
import { Settings } from '@yakumi-app/domain/card/types';
import { DEFAULT_CHAR_IMG } from '@yakumi-app/domain/fallMagia/constants';
import { getImageSrc } from '@yakumi-app/domain/image/getImageSrc';
import { CharacterSheetDetailsProp } from '@yakumi-app/domain/spreadSheet/sheetToCharacter/types';
import { calcSHA256Async } from '@yakumi-app/domain/udonarium/FileReaderUtil';
import { createZip } from '@yakumi-app/domain/udonarium/common';
import { FileArchiver } from '@yakumi-app/domain/udonarium/fileArchiver';
import { createUdonariumTokens } from '../extraTags/createUdonariumTokens';
import { CharacterSheetPropsCard, ExtraTag } from '../types';
import { createCharacter } from './characterFile';
import { createVSRankChearacterDeck } from './createCharacterDeck';

const getBlob = async (image: File | undefined, src: string) => {
  if (image && image.size > 0) {
    return image;
  }

  const defaultImageFileDataUrl = src ? src : getImageSrc(DEFAULT_CHAR_IMG);
  const res = await fetch(defaultImageFileDataUrl, { mode: 'cors' });
  const blob = await res.blob();
  return blob;
};

const createCharacterImage = async (image: File | undefined, src: string) => {
  const blob = await getBlob(image, src);

  const identifier = await calcSHA256Async(blob);
  return {
    file: new File([blob], `${identifier}.png`, {
      type: blob.type,
    }),
    identifier,
  };
};

const _createVSRankCharasheetAndDeckToUdonarium = async (
  refList: React.RefObject<HTMLDivElement>[],
  cards: CharacterSheetPropsCard[],
  backRef: any,
  setting: Settings,
  character: {
    name: string;
    image: File | undefined;
    params: CharacterSheetDetailsProp[];
    src: string;
  },
  extraTags: ExtraTag[],
) => {
  const { deck, back, files, deckAlways, deckNoBattle } =
    await createVSRankChearacterDeck(refList, cards, backRef, setting);
  const { file, identifier } = await createCharacterImage(
    character.image,
    character.src,
  );
  const char = createCharacter(
    character.name,
    character.params,
    identifier,
    cards,
  );
  const extra = await createUdonariumTokens(extraTags);
  const ret = [
    back.file,
    ...files.map((f) => f.file),
    char,
    file,
    deck,
    ...extra,
  ];
  if (deckNoBattle) ret.push(deckNoBattle);
  if (deckAlways) ret.push(deckAlways);
  return ret;
};
export const createVSRankCharasheetAndDeckToUdonarium = async (
  refList: React.RefObject<HTMLDivElement>[],
  cards: CharacterSheetPropsCard[],
  backRef: any,
  setting: Settings,
  character: {
    name: string;
    image: File | undefined;
    params: CharacterSheetDetailsProp[];
    src: string;
  },
  extraTags: ExtraTag[],
) => {
  const ret = await _createVSRankCharasheetAndDeckToUdonarium(
    refList,
    cards,
    backRef,
    setting,
    character,
    extraTags,
  );
  await createZip(ret, setting.deckName);
};

export const createVSRankCharasheetAndDeckToUdonariumBlob = async (
  refList: React.RefObject<HTMLDivElement>[],
  cards: CharacterSheetPropsCard[],
  backRef: any,
  setting: Settings,
  character: {
    name: string;
    image: File | undefined;
    params: CharacterSheetDetailsProp[];
    src: string;
  },
  extraTags: ExtraTag[],
) => {
  const ret = await _createVSRankCharasheetAndDeckToUdonarium(
    refList,
    cards,
    backRef,
    setting,
    character,
    extraTags,
  );
  return FileArchiver.instance.generateBlob(ret);
};
