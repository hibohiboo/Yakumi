import {
  CharacterSheetDetailsProp,
  CharacterSheetProp,
  CharacterSheetPropsCard,
} from '../types';
type PickedCard = Pick<
  CharacterSheetPropsCard,
  | 'sheetPropsResourceName'
  | 'sheetPropsName'
  | 'sheetPropsResourceType'
  | 'sheetPropsValue'
  | 'currentValue'
>;

export const cardsToParameters = (
  cards: PickedCard[],
): CharacterSheetDetailsProp[] => {
  const details: CharacterSheetDetailsProp[] = [];
  cards.forEach((card) => {
    const detail = details.find((d) => d.name === card.sheetPropsResourceName);
    if (detail) {
      // nameが同じでvalueが数値にできる場合は加算する
      const item = detail.items.find((i) => i.name === card.sheetPropsName);
      if (item) {
        const { value, currentValue } = calcValue(card, item);
        item.value = value;
        item.currentValue = currentValue;
      } else {
        detail.items.push({
          name: card.sheetPropsName,
          sheetPropsResourceType: card.sheetPropsResourceType,
          value: card.sheetPropsValue,
          currentValue: card.currentValue,
        });
      }
    } else {
      details.push({
        name: card.sheetPropsResourceName,
        items: [
          {
            name: card.sheetPropsName,
            sheetPropsResourceType: card.sheetPropsResourceType,
            value: card.sheetPropsValue,
            currentValue: card.currentValue,
          },
        ],
      });
    }
  });
  return details;
};

function calcValue(
  card: PickedCard,
  item: CharacterSheetProp,
): { value: string; currentValue?: number | undefined } {
  if (item) {
    const value = `${Number(item.value) + Number(card.sheetPropsValue)}`;
    if (item.currentValue && card.currentValue) {
      return { value, currentValue: item.currentValue + card.currentValue };
    }
    return { value };
  }
  return { value: card.sheetPropsValue };
}
