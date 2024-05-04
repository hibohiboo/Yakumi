import { TextImageCard } from '../types';
/**
 * 文字列配列をうけとり、TextCardの配列を返す。
 * @param values 文字列配列の配列
 */
export function valuesToTextImageCards(values: string[][]): TextImageCard[] {
  const textCards: TextImageCard[] = [];
  for (const line of values) {
    const [name, content, id, type, imageName] = line;
    textCards.push({ name, content, id, type, imageName });
  }
  return textCards;
}
