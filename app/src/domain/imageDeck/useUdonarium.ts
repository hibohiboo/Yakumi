/* eslint-disable @typescript-eslint/no-explicit-any */
import { ImageCardWithFile, Settings } from '../card/types';
import { calcSHA256Async } from '../udonarium/FileReaderUtil';
import { createZip, getDoc } from '../udonarium/common';
import {
  createCardWithProp,
  createDeck,
  createXML,
} from '../udonarium/udonariumZip';

export const createImageDeckToUdonarium = async (
  items: ImageCardWithFile[],
  setting: Settings,
) => {
  const files = await Promise.all(
    items.map(async (item) => {
      const props = [
        {
          title: '詳細',
          props: [{ label: '', value: item.description, type: 'note' }],
        },
      ];
      const doc = getDoc();

      const card = createCardWithProp(
        doc,
        item.name,
        await calcSHA256Async(item.frontFile),
        await calcSHA256Async(item.backFile),
        props,
        setting.state,
        setting.size,
      );
      const xml = createXML(item.name, doc, card);
      return { xml, frontFile: item.frontFile, backFile: item.backFile, card };
    }),
  );

  const deck = createDeck(
    setting.deckName,
    files.map((f) => f.card),
    setting,
  );
  await createZip(
    [deck, ...files.flatMap((f) => [f.frontFile, f.backFile])],
    setting.deckName,
  );
};
