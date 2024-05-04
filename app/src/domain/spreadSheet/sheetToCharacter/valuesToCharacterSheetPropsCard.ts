import { CharacterSheetPropsCard } from './types';

/**
 * 文字列配列をうけとり、CharacterSheetPropsCard の配列を返す。
 * @param values 文字列配列の配列
 */
export function valuesToCharacterSheetPropsCard(
  values: string[][],
): CharacterSheetPropsCard[] {
  const textCards: CharacterSheetPropsCard[] = [];
  for (const line of values) {
    const [
      id,
      name,
      content,
      type,
      sheetPropsName,
      sheetPropsResourceName,
      sheetPropsValue,
      sheetPropsResourceTypeBase,
    ] = line;
    const sheetPropsResourceType = toSheetPropsResourceType(
      sheetPropsResourceTypeBase,
    );
    textCards.push({
      name,
      content,
      id,
      type,
      sheetPropsName,
      sheetPropsResourceName,
      sheetPropsValue,
      sheetPropsResourceType,
      currentValue: toSheetPropsCurrentValue(
        sheetPropsResourceTypeBase,
        sheetPropsValue,
      ),
      count: 0,
    });
  }
  return textCards;
}

function toSheetPropsResourceType(base: string | undefined) {
  if (base == undefined) return undefined;
  if (base === 'numberResource') return 'numberResource';
  if (base === 'チェック') return 'numberResource';
  if (base === 'note') return 'note';
  return undefined;
}
function toSheetPropsCurrentValue(
  type: string | undefined,
  sheetPropsValue: string | undefined,
) {
  if (type == undefined) return undefined;
  if (type === 'note') return undefined;
  if (type === 'チェック') return 0;
  if (type === 'numberResource') return Number(sheetPropsValue);
  return undefined;
}
