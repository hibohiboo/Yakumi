/* eslint-disable @typescript-eslint/no-explicit-any */
import { Settings } from '@yakumi-app/domain/card/types';
import { getImageSrc } from '@yakumi-app/domain/image/getImageSrc';
import { createCharacter } from '@yakumi-app/domain/spreadSheet/sheetToCharacter/udonarium/characterFile';
import { calcSHA256Async } from '@yakumi-app/domain/udonarium/FileReaderUtil';
import { createZip } from '@yakumi-app/domain/udonarium/common';

import { CharacterSheetDetailsProp, CharacterSheetPropsCard } from './types';
import { createChearacterDeck } from './udonarium/createCharacterDeck';

const getDefaultBlob = async () => {
  const defaultImageFileDataUrl = getImageSrc(
    'assets/images/udonarium/outline_person_outline_black_24dp.png',
  );
  const res = await fetch(defaultImageFileDataUrl);
  const blob = await res.blob();
  return blob;
};

const createCharacterImage = async (image: File | undefined) => {
  const blob = image || (await getDefaultBlob());

  const identifier = await calcSHA256Async(blob);
  return {
    file: new File([blob], `${identifier}.png`, {
      type: blob.type,
    }),
    identifier,
  };
};

export const createCharasheetAndDeckToUdonarium = async (
  refList: React.RefObject<HTMLDivElement>[],
  items: CharacterSheetPropsCard[],
  backRef: any,
  setting: Settings,
  character: {
    name: string;
    image: File | undefined;
    params: CharacterSheetDetailsProp[];
  },
) => {
  const { deck, back, files } = await createChearacterDeck(
    refList,
    items,
    backRef,
    setting,
  );
  const { file, identifier } = await createCharacterImage(character.image);
  const char = createCharacter(character.name, character.params, identifier);

  await createZip(
    [back.file, deck, ...files.map((f) => f.file), char, file],
    setting.deckName,
  );
};
