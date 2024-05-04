import { AUTO_GET } from '../constants';
import { CharacterSheetPropsCard } from '../types';

/**
 * 文字列配列をうけとり、CharacterSheetPropsCard の配列を返す。
 * @param values 文字列配列の配列
 */
export function valuesToCharacterSheetPropsCard(
  values: string[][],
): CharacterSheetPropsCard[] {
  const textCards: CharacterSheetPropsCard[] = [];
  for (let index = 0, len = values.length; index < len; index++) {
    const [
      id,
      type,
      cp,
      name,
      timing,
      countdown,
      range,
      cost,
      content,
      flavor,
      tags,
      sheetPropsName,
      sheetPropsResourceName,
      sheetPropsValue,
      sheetPropsResourceTypeBase,
      effectType,
      effectVariable,
      extraTags,
    ] = values[index];
    const sheetPropsResourceType = toSheetPropsResourceType(
      sheetPropsResourceTypeBase,
    );
    textCards.push({
      id,
      type,
      cp: Number(cp),
      name,
      timing,
      countdown,
      range,
      cost,
      content,
      flavor,
      tags: tags?.split(',') ?? [],
      sheetPropsName,
      sheetPropsResourceName,
      sheetPropsValue,
      sheetPropsResourceType,
      effectType,
      effectVariable,
      extraTags,
      currentValue: toSheetPropsCurrentValue(
        sheetPropsResourceTypeBase,
        sheetPropsValue,
      ),
      count: type === AUTO_GET ? 1 : 0, // typeがAの時は自動取得なので1, それ以外は0
      index,
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
