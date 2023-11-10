import { parse } from 'papaparse';
import { TextCard } from './types';
/**
 * csv形式の文字列をうけとり、TextCardの配列を返す。
 * @param csv csv形式の文字列
 */
export function csvToTextCards(csv: string): TextCard[] {
  // 1行目は読み飛ばし
  const [, ...lines] = parse(csv, { skipEmptyLines: true }).data as string[];

  const textCards: TextCard[] = [];
  for (const line of lines) {
    const [name, content, id, type] = line;
    textCards.push({ name, content, id, type });
  }
  return textCards;
}
