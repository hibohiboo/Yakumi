import { scene4SelectItems } from '../services/scene4Items';
import { useFallMagiaCharacterPageBaseHooks } from './baseHooks';

export const useFallMagiaCharacterPageHooks = () => {
  const base = useFallMagiaCharacterPageBaseHooks();

  return {
    ...base,
    scene4SelectItems,
  };
};

export type FallMagiaCharacterPageViewModel = ReturnType<
  typeof useFallMagiaCharacterPageHooks
>;
