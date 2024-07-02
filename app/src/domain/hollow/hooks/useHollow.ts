import React, { createRef, useCallback, useRef, useState } from 'react';
import { CARDS } from '../constants';
import {
  createImageAllPackUdonariumZip,
  createImageUdonariumZip,
} from '../createImageUdonariumZip';
const LOCAL_STORAGE_KEY = 'hollowCards';
const getFirstCards = () => {
  const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedData) {
    return JSON.parse(savedData) as {
      name: string;
      cost: number;
      deck: number;
      guard: number;
      index: number;
    }[];
  }
  return CARDS.map((card, index) => ({ ...card, deck: 0, guard: 0, index }));
};

export const useHollow = () => {
  const [cards, setCards] = React.useState(getFirstCards());
  const clearStorage = () => {
    if (!window.confirm('デッキを初期化しますか？')) {
      return;
    }
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setCards(getFirstCards());
  };
  const changeHandler =
    (card: { name: string }) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const updateCards = cards.map((c) => {
        if (c.name === card.name) {
          return { ...c, deck: e.target.valueAsNumber };
        }
        return c;
      });
      setCards(updateCards);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateCards));
    };
  const changeGuardHandler =
    (card: { name: string }) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const updateCards = cards.map((c) => {
        if (c.name === card.name) {
          return { ...c, guard: e.target.valueAsNumber };
        }
        return c;
      });
      setCards(updateCards);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateCards));
    };
  const [isModelShow, setIsModelShow] = useState(false);
  const [clickedCardName, setClickedCardName] = useState('');
  const handleClose = useCallback(() => setIsModelShow(false), []);
  const cardClickHandler = (card: { name: string }) => {
    setClickedCardName(card.name);
    setIsModelShow(true);
  };

  const listRefs = useRef<React.RefObject<HTMLImageElement>[]>([]);
  cards.forEach(
    (item) => (listRefs.current[item.index] = createRef<HTMLImageElement>()),
  );
  const backRef = useRef<HTMLImageElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadUdonarium = async () => {
    const list = cards.filter((card) => card.deck > 0);
    if (list.length === 0) {
      alert('カードを選択してください');
      return;
    }
    setIsDownloading(true);
    await createImageUdonariumZip(
      cards,
      'HollowΦFlux',
      listRefs.current,
      backRef,
    );
    setIsDownloading(false);
  };
  const downloadAllPack = async () => {
    setIsDownloading(true);
    await createImageAllPackUdonariumZip(
      cards,
      'HollowΦFlux全カード',
      listRefs.current,
      backRef,
    );
    setIsDownloading(false);
  };
  return {
    cards,
    downloadUdonarium,
    changeHandler,
    changeGuardHandler,
    isDisplayCardNameOnly: false,
    isModelShow,
    setIsModelShow,
    clickedCardName,
    setClickedCardName,
    handleClose,
    cardClickHandler,
    clearStorage,
    listRefs,
    backRef,
    downloadAllPack,
    isDownloading,
  };
};

export type UseHollowViewModel = ReturnType<typeof useHollow>;
