import html2canvas from 'html2canvas';
import { canvasToFile } from '../udonarium/canvas';
import { createZip, getDoc } from '../udonarium/common';
import { createElement } from '../udonarium/fileArchiver';
import { createDeck } from '../udonarium/udonariumZip';
const createCardBase = ({
  doc,
  cardName: cardName,
  frontIdentifier,
  backIdentifier,
  detail = createElement(doc, 'data', [['name', 'detail']]),
}: {
  doc: Document;
  cardName: string;
  detail?: HTMLElement;
  frontIdentifier: string;
  backIdentifier: string;
}) => {
  const cardWrapper = createElement(doc, 'card', [
    ['location.name', 'table'],
    ['location.x', '50'],
    ['location.y', '500'],
    ['posZ', '0'],
    ['rotate', '0'],
    ['roll', '0'],
    ['zindex', '0'],
    ['state', '0'],
  ]);
  const cardData = createElement(doc, 'data', [['name', 'card']]);
  const image = createElement(doc, 'data', [['name', 'image']]);
  const imageIdentifier = createElement(doc, 'data', [
    ['name', 'imageIdentifier'],
    ['type', 'image'],
  ]);
  const front = createElement(
    doc,
    'data',
    [
      ['name', 'front'],
      ['type', 'image'],
    ],
    frontIdentifier,
  );
  const back = createElement(
    doc,
    'data',
    [
      ['name', 'back'],
      ['type', 'image'],
    ],
    backIdentifier,
  );
  image.appendChild(imageIdentifier);
  image.appendChild(front);
  image.appendChild(back);

  const name = createElement(doc, 'data', [['name', 'name']], cardName);
  const size = createElement(doc, 'data', [['name', 'size']], '2');
  const common = createElement(doc, 'data', [['name', 'common']]);
  image.appendChild(imageIdentifier);
  common.appendChild(name);
  common.appendChild(size);
  cardData.appendChild(image);
  cardData.appendChild(common);
  cardData.appendChild(detail);
  cardWrapper.appendChild(cardData);
  return cardWrapper;
};

const createCardWithProp = (
  doc: Document,
  cardName: string,
  front: {
    file: File;
    identifier: string;
  },
  back: {
    file: File;
    identifier: string;
  },
): HTMLElement => {
  return createCardBase({
    doc,
    cardName,
    frontIdentifier: front.identifier,
    backIdentifier: back.identifier,
  });
};

const createImageUdonariumDeck = async (
  items: { name: string; deck: number; guard: number; index: number }[],
  target: 'deck' | 'guard',
  deckName: string,
  refList: React.RefObject<HTMLImageElement>[],
  back: {
    file: File;
    identifier: string;
  },
) => {
  const list = await Promise.all(
    items
      .filter((i) => i[target] > 0)
      .flatMap((item) => {
        return new Array(item[target]).fill(0).map(async () => {
          const doc = getDoc();
          const ref = refList[item.index];
          if (!ref.current) {
            console.warn('item', item);
            throw Error('ref.current is undefined');
          }
          const canvas = await html2canvas(ref.current);
          const front = await canvasToFile(canvas);
          const card = createCardWithProp(doc, item.name, front, back);
          return { card, front: front.file };
        });
      }),
  );
  const deck = createDeck(
    deckName,
    list.map((i) => i.card),
    {
      deckName,
      state: '0',
      size: '2',
      description: '',
    },
  );
  return [deck, ...list.map((i) => i.front)];
};

export const createImageUdonariumZip = async (
  items: { name: string; deck: number; guard: number; index: number }[],
  deckName: string,
  refList: React.RefObject<HTMLImageElement>[],
  backRef: React.RefObject<HTMLImageElement>,
) => {
  const decs = [];
  if (!backRef.current) throw new Error('backRef is undefined');
  const canvas = await html2canvas(backRef.current);
  const back = await canvasToFile(canvas);
  decs.push(
    ...(await createImageUdonariumDeck(
      items,
      'deck',
      `${deckName}デッキ`,
      refList,
      back,
    )),
  );
  decs.push(
    ...(await createImageUdonariumDeck(
      items,
      'guard',
      `${deckName}ガードデッキ`,
      refList,
      back,
    )),
  );
  decs.push(back.file);
  await createZip(decs, deckName);
};
