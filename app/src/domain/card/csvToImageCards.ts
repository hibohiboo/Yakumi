import { parse } from 'papaparse';
import { ImageCard } from './types';
/**
 * csv形式の文字列をうけとり、TextCardの配列を返す。
 * @param csv csv形式の文字列
 */
export function csvToImageCards(csv: string): ImageCard[] {
  // 1行目は読み飛ばし
  const [, ...lines] = parse(csv, { skipEmptyLines: true }).data as string[];

  const textCards: ImageCard[] = [];
  for (const line of lines) {
    const [name, back, front, description] = line;
    console.log(line);
    textCards.push({ name, back, front, description });
  }
  return textCards;
}
