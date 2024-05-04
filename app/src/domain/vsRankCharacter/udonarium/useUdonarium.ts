/* eslint-disable @typescript-eslint/no-explicit-any */
import { Settings } from '@yakumi-app/domain/card/types';
import { getImageSrc } from '@yakumi-app/domain/image/getImageSrc';
import { CharacterSheetDetailsProp } from '@yakumi-app/domain/spreadSheet/sheetToCharacter/types';
import { calcSHA256Async } from '@yakumi-app/domain/udonarium/FileReaderUtil';
import { createZip } from '@yakumi-app/domain/udonarium/common';
import { FileArchiver } from '@yakumi-app/domain/udonarium/fileArchiver';
import { createUdonariumTokens } from '../extraTags/createUdonariumTokens';
import { CharacterSheetPropsCard, ExtraTag } from '../types';
import { createCharacter } from './characterFile';
import { createVSRankChearacterDeck } from './createCharacterDeck';

const getBlob = async (image: File | undefined) => {
  if (image && image.size > 0) {
    return image;
  }
  // getDefaultBlob
  const defaultImageFileDataUrl = getImageSrc(
    'assets/images/udonarium/outline_person_outline_black_24dp.png',
  );
  const res = await fetch(defaultImageFileDataUrl);

  const blob = await res.blob();
  return blob;
};

const createCharacterImage = async (image: File | undefined) => {
  const blob = await getBlob(image);

  const identifier = await calcSHA256Async(blob);
  return {
    file: new File([blob], `${identifier}.png`, {
      type: blob.type,
    }),
    identifier,
  };
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
  },
  extraTags: ExtraTag[],
) => {
  const { deck, back, files, deckAlways, deckNoBattle } =
    await createVSRankChearacterDeck(refList, cards, backRef, setting);
  const { file, identifier } = await createCharacterImage(character.image);
  const char = createCharacter(
    character.name,
    character.params,
    identifier,
    cards,
  );
  const extra = await createUdonariumTokens(extraTags);

  await createZip(
    [
      back.file,
      ...files.map((f) => f.file),
      char,
      file,
      deckNoBattle,
      deckAlways,
      deck,
      ...extra,
    ],
    setting.deckName,
  );
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
  },
  extraTags: ExtraTag[],
) => {
  const { deck, back, files, deckAlways, deckNoBattle } =
    await createVSRankChearacterDeck(refList, cards, backRef, setting);
  const { file, identifier } = await createCharacterImage(character.image);
  const char = createCharacter(
    character.name,
    character.params,
    identifier,
    cards,
  );
  const extra = await createUdonariumTokens(extraTags);

  return FileArchiver.instance.generateBlob([
    back.file,
    ...files.map((f) => f.file),
    char,
    file,
    deckNoBattle,
    deckAlways,
    deck,
    ...extra,
  ]);
};
