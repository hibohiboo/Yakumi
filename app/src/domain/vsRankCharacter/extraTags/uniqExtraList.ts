import { uniq } from 'lodash';
import { CharacterSheetPropsCard } from '../types';

export const uniqExtraList = (cards: CharacterSheetPropsCard[]) => {
  const extra = cards.map((card) => card.extraTags).flat();
  return uniq(extra);
};
