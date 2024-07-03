import { CARDS } from '../constants';
const LOCAL_STORAGE_KEY = 'hollowCards';
export const getFirstCards = () => {
  const cards = CARDS.map((card, index) => ({
    ...card,
    deck: 0,
    guard: 0,
    index,
  }));
  const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!savedData) {
    return cards;
  }
  const savedCards = JSON.parse(savedData) as {
    name: string;
    cost: number;
    deck: number;
    guard: number;
    index: number;
  }[];
  if (cards.length <= savedCards.length) {
    return savedCards;
  }
  return cards.map((card) => {
    const c = savedCards.find((c) => c.name === card.name);
    if (c) {
      return c;
    }
    return card;
  });
};
export const clearLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};
export const setLocalStorage = (
  updateCards: { name: string; deck: number; guard: number }[],
) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateCards));
};
