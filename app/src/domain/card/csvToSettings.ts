/* eslint-disable @typescript-eslint/no-explicit-any */
import { parse } from 'papaparse';
import { Settings } from './types';
/**
 * csv形式の文字列をうけとり、TextCardの配列を返す。
 * @param csv csv形式の文字列
 */
export function csvToSettings(csv: string): Settings {
  const lines = parse(csv, { skipEmptyLines: true, delimiter: ':' })
    .data as any[];

  // 配列からマップを作成
  const map = new Map(lines);
  return {
    deckName: `${map.get('デッキ名')}`,
    state: map.get('表裏') === '裏' ? '1' : '0',
    size: `${map.get('カードサイズ')}`,
    description: `${map.get('説明')}`,
  };
}
