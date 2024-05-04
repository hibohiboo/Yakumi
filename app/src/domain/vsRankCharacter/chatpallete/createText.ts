import { ATTACK, WEAPON_ATTACK } from '../constants';
import { CharacterSheetPropsCard } from '../types';

export const createChatPalleteText = (cards: CharacterSheetPropsCard[]) => {
  const text = `${cards
    .flatMap((c) => {
      switch (c.effectType) {
        case `${ATTACK}`:
        case `${WEAPON_ATTACK}`:
          return [
            `${c.effectVariable?.replace(/\/([0-9])+/g, '/$1U')} ${c.name}`,
          ];
      }
      return [];
    })
    .join('\n')}`;
  return text;
};
