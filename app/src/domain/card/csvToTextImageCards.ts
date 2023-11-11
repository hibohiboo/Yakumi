import { parse } from 'papaparse';
import { TextImageCard } from './types';
/**
 * csv形式の文字列をうけとり、TextCardの配列を返す。
 * @param csv csv形式の文字列
 */
export function csvToTextImageCards(csv: string): TextImageCard[] {
  // 1行目は読み飛ばし
  const [, ...lines] = parse(csv, { skipEmptyLines: true }).data as string[];

  const textCards: TextImageCard[] = [];
  for (const line of lines) {
    const [name, content, id, type, imageName] = line;
    textCards.push({ name, content, id, type, imageName });
  }
  return textCards;
}
