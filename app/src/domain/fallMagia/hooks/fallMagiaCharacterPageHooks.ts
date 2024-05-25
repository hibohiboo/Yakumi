import { useSelector } from 'react-redux';
import { scene4SelectItems } from '../services/scene4Items';
import {
  cardListFlatSelector,
  cardListGapSelector,
} from '../store/slices/fallMagiaCharacterPageSlice';
import { useFallMagiaCharacterPageBaseHooks } from './baseHooks';

export const useFallMagiaCharacterPageHooks = () => {
  const base = useFallMagiaCharacterPageBaseHooks();
  const cardListGap = useSelector(cardListGapSelector);
  const flatCards = useSelector(cardListFlatSelector);
  return {
    ...base,
    scene4SelectItems,
    cardListGap,
    flatCards,
  };
};

export type FallMagiaCharacterPageViewModel = ReturnType<
  typeof useFallMagiaCharacterPageHooks
>;
