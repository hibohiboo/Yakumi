import { useAppDispatch, useAppSelector } from '@yakumi-app/store/hooks';
import { Scene4SelectItem, scene4SelectItems } from '../services/scene4Items';
import {
  characterFactionSelector,
  setFaction,
} from '../store/slices/fallMagiaCharacterSlice';

export const useFallMagiaScene4Hooks = () => {
  const selectedItem = useAppSelector(characterFactionSelector);
  const dispatch = useAppDispatch();
  const setItem = (item: Scene4SelectItem) => {
    dispatch(setFaction(item.tag));
  };
  return {
    selectedItem,
    setItem,
    scene4SelectItems,
  };
};
