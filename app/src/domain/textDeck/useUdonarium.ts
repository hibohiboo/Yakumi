/* eslint-disable @typescript-eslint/no-explicit-any */
import html2canvas from 'html2canvas';
import { Settings, TextCard } from '../card/types';
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
  setting: Settings,
) => {
  const back = await canvasToFile(await html2canvas(backRef.current));

  const files = await Promise.all(
    items.map(async (item, i) => {
      const ref = refList[i];
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
        setting.state,
        setting.size,
      );
      const xml = createXML(item.name, doc, card);
      return { xml, file: front.file, card, type: item.type };
    }),
  );

  const deck = createDeck(
    setting.deckName,
    files.map((f) => f.card),
    setting,
  );
  await createZip(
    [back.file, deck, ...files.map((f) => f.file)],
    setting.deckName,
  );
};
