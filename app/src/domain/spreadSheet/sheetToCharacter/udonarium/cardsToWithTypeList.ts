import { CharacterSheetPropsCard } from '../types';
type PickedCard = Pick<CharacterSheetPropsCard, 'type'>;

type CardsWithType<T extends PickedCard> = {
  type: string;
  label: string;
  items: T[];
};

export const cardsToWithTypeList = <T extends PickedCard>(
  cards: T[],
  typeList: { type: string; label: string }[],
): CardsWithType<T>[] => {
  const details: CardsWithType<T>[] = [];
  cards.forEach((card) => {
    const detail = details.find((d) => d.type === card.type);
    if (detail) {
      detail.items.push(card);
    } else {
      details.push({
        type: card.type,
        label: typeList.find((t) => t.type === card.type)?.label ?? '',
        items: [card],
      });
    }
  });
  return details.sort((a, b) => a.type.localeCompare(b.type));
};
