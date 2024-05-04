import { Settings } from '@yakumi-app/domain/card/types';
import { canvasToFile } from '@yakumi-app/domain/udonarium/canvas';
import { getDoc } from '@yakumi-app/domain/udonarium/common';
import {
  createCardWithProp,
  createDeck,
  createXML,
} from '@yakumi-app/domain/udonarium/udonariumZip';
import html2canvas from 'html2canvas';
import { CharacterSheetPropsCard } from '../types';

export const createChearacterDeck = async (
  refList: React.RefObject<HTMLDivElement>[],
  items: CharacterSheetPropsCard[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  backRef: any,
  setting: Settings,
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
  return { deck, back, files };
};
