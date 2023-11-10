/* eslint-disable @typescript-eslint/no-explicit-any */
import html2canvas from 'html2canvas';
import { TextCard } from '../card/types';
import { canvasToFile } from '../udonarium/canvas';
import { createZip, getDoc } from '../udonarium/common';
import {
  createCardWithProp,
  createDeck,
  createXML,
} from '../udonarium/udonariumZip';

export const createTextDeckToUdonarium = async (
  refList: React.RefObject<HTMLDivElement>[],
  items: TextCard[],
  backRef: any,
) => {
  const back = await canvasToFile(await html2canvas(backRef.current));

  const files = await Promise.all(
    items.map(async (item, i) => {
      const ref = refList[i];
      const canvas = await html2canvas(ref.current!);
      const front = await canvasToFile(canvas);
      const props = [
        {
          title: item.name,
          props: [{ label: '種別', value: item.type, type: undefined }],
        },
        {
          title: item.type,
          props: [{ label: '', value: item.content, type: 'note' }],
        },
      ];
      const doc = getDoc();

      const card = createCardWithProp(
        doc,
        item.name,
        front.identifier,
        back.identifier,
        props,
      );
      const xml = createXML(item.name, doc, card);
      return { xml, file: front.file, card, type: item.type };
    }),
  );

  const deck = createDeck(
    'カードデッキ',
    files.map((f) => f.card),
  );
  await createZip([back.file, deck, ...files.map((f) => f.file)]);
};
