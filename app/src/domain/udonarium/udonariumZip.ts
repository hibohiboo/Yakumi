import { Settings } from '../card/types';
import { getDoc } from './common';
import { convertDocToXML, createElement } from './fileArchiver';

export const createCardStackElment = (
  doc: Document,
  stackName: string,
  description: string,
) => {
  // #card-stack
  const cardStack = createElement(doc, 'data', [['name', 'card-stack']]);
  const image = createElement(doc, 'data', [['name', 'image']]);
  const imageIdentifier = createElement(doc, 'data', [
    ['name', 'imageIdentifier'],
    ['type', 'image'],
  ]);
  const common = createElement(doc, 'data', [['name', 'common']]);
  const name = createElement(doc, 'data', [['name', 'name']], stackName);
  const detail = createElement(doc, 'data', [['name', 'detail']]);
  image.appendChild(imageIdentifier);
  common.appendChild(name);
  common.appendChild(
    createElement(
      doc,
      'data',
      [
        ['name', '説明'],
        ['type', 'note'],
      ],
      description,
    ),
  );
  cardStack.appendChild(image);
  cardStack.appendChild(common);
  cardStack.appendChild(detail);

  return cardStack;
};

export const createCardStackXML = (
  stackName: string,
  doc: XMLDocument,
  children: HTMLElement[],
  settings: Settings,
) => {
  const cardStackWrapper = createElement(doc, 'card-stack', [
    ['location.name', 'table'],
    ['location.x', '50'],
    ['location.y', '500'],
    ['posZ', '0'],
    ['rotate', '0'],
    ['roll', '0'],
    ['zindex', '0'],
    ['state', settings.state],
    ['isShowTotal', 'true'],
  ]);
  cardStackWrapper.appendChild(
    createCardStackElment(doc, stackName, settings.description),
  );
  children.forEach((child) => cardStackWrapper.appendChild(child));

  return createXML(stackName, doc, cardStackWrapper);
};

export const createXML = (
  xmlName: string,
  doc: XMLDocument,
  target: HTMLElement,
) => {
  doc.appendChild(target);
  const sXML = convertDocToXML(doc);
  return new File([sXML], `${xmlName}.xml`, { type: 'text/plain' });
};

const createCardBase = ({
  doc,
  stackName,
  frontIdentifier,
  backIdentifier,
  common = createElement(doc, 'data', [['name', 'common']]),
  detail = createElement(doc, 'data', [['name', 'detail']]),
  state = '0',
  cardSize = '3',
}: {
  doc: Document;
  stackName: string;
  frontIdentifier: string;
  backIdentifier: string;
  common?: HTMLElement;
  detail?: HTMLElement;
  state?: string;
  cardSize?: string;
}) => {
  const cardWrapper = createElement(doc, 'card', [
    ['location.name', 'table'],
    ['location.x', '50'],
    ['location.y', '500'],
    ['posZ', '0'],
    ['rotate', '0'],
    ['roll', '0'],
    ['zindex', '0'],
    ['state', state],
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

  const name = createElement(doc, 'data', [['name', 'name']], stackName);
  const size = createElement(doc, 'data', [['name', 'size']], cardSize);

  image.appendChild(imageIdentifier);
  common.appendChild(name);
  common.appendChild(size);
  cardData.appendChild(image);
  cardData.appendChild(common);
  cardData.appendChild(detail);
  cardWrapper.appendChild(cardData);
  return cardWrapper;
};

export const createCard = (
  doc: Document,
  stackName: string,
  frontIdentifier: string,
  backIdentifier: string,
) => {
  return createCardBase({ doc, stackName, frontIdentifier, backIdentifier });
};

export const createCardRoot = (doc: Document, children: HTMLElement[]) => {
  const cardRoot = createElement(doc, 'node', [['name', 'cardRoot']]);
  children.forEach((child) => cardRoot.appendChild(child));
  return cardRoot;
};
export const createDeck = (
  deckTitle: string,
  list: HTMLElement[],
  settings: Settings,
) => {
  const root = createCardRoot(getDoc(), list);
  const deck = createCardStackXML(deckTitle, getDoc(), [root], settings);
  return deck;
};

export const createCardWithProp = (
  doc: Document,
  stackName: string,
  frontIdentifier: string,
  backIdentifier: string,
  cardProps: {
    title: string;
    props: { label: string; value: string; type?: string }[];
  }[],
  state?: string,
  cardSize?: string,
): HTMLElement => {
  const detail = createElement(doc, 'data', [['name', 'detail']]);
  cardProps.forEach((p) => {
    const tmp = createElement(doc, 'data', [['name', p.title]]);
    p.props.forEach((prop) => {
      const arr: [string, string][] = [['name', prop.label]];
      if (prop.type) {
        arr.push(['type', prop.type]);
      }
      tmp.appendChild(createElement(doc, 'data', arr, prop.value));
    });
    detail.appendChild(tmp);
  });

  return createCardBase({
    doc,
    stackName,
    frontIdentifier,
    backIdentifier,
    detail,
    state,
    cardSize,
  });
};
