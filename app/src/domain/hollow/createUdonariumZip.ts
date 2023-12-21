import { createZip, getDoc } from '../udonarium/common';
import { createElement } from '../udonarium/fileArchiver';
import { createDeck } from '../udonarium/udonariumZip';
const createCardBase = ({
  doc,
  cardName: cardName,
  detail = createElement(doc, 'data', [['name', 'detail']]),
}: {
  doc: Document;
  cardName: string;
  detail?: HTMLElement;
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
    `/assets/images/hollowFlux/cards/${cardName}.png`,
  );
  const back = createElement(
    doc,
    'data',
    [
      ['name', 'back'],
      ['type', 'image'],
    ],
    `/assets/images/hollowFlux/card_back.png`,
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

const createCardWithProp = (doc: Document, cardName: string): HTMLElement => {
  return createCardBase({
    doc,
    cardName,
  });
};

export const createUdonariumZip = async (
  items: { name: string; count: number }[],
  deckName: string,
  deckdescription: string,
  items2: { name: string; count: number }[],
  deckName2: string,
  deckdescription2: string,
) => {
  const decs = [];
  const list = items.flatMap((item) => {
    return new Array(item.count).fill(0).map(() => {
      const doc = getDoc();
      const card = createCardWithProp(doc, item.name);
      return card;
    });
  });
  const deck = createDeck(deckName, list, {
    deckName,
    state: '0',
    size: '2',
    description: deckdescription,
  });
  decs.push(deck);
  if (items2.length > 0) {
    const list2 = items2.flatMap((item) => {
      return new Array(item.count).fill(0).map(() => {
        const doc = getDoc();
        const card = createCardWithProp(doc, item.name);
        return card;
      });
    });
    const deck2 = createDeck(deckName2, list2, {
      deckName: deckName2,
      state: '0',
      size: '2',
      description: deckdescription2,
    });
    decs.push(deck2);
  }
  await createZip(decs, deckName);
};
