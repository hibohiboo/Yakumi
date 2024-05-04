export interface CharacterSheetPropsCard {
  id: string;
  type: string;
  cp: number;
  name: string;
  timing: string;
  countdown: string;
  range: string;
  cost: string;
  content: string;
  flavor: string;
  tags: string[];
  src?: string;
  sheetPropsName: string; // <data name="器用度">24</data> の器用度
  sheetPropsResourceName: string; // <data name="能力"><data name="器用度">の能力
  sheetPropsValue: string; // <data name="敏捷度">24</data>の24. またsheetPropsResourceTypeがnumberResourceの場合は数値とする。
  sheetPropsResourceType?: undefined | 'numberResource' | 'note';
  currentValue?: number | undefined; // リソースタイプがチェックの時には、 <data type="numberResource" currentValue="0" name="MP">1</data> とする
  effectType?: string; // cpOffの場合にCP計算の特殊処理を行う
  effectVariable?: string; // cpOffの対象タグ
  extraTags?: string; // カードの特殊効果を表すタグ
  count: number;
  index: number; //  refListのindex に使う（連番）
}

export interface ExtraTag {
  id: string; // poison
  type: string; // ▲状態
  value: string; // 毒
  effect: string; // 手番の終わりのたび、{強度}点のダメージを与える。防御力無視。
  icon: string; // ユドナリウムのアイコン用の画像
}

export interface CharacterIdListItem {
  id: string;
  name: string;
}
export interface CharacterExtraTag {
  icon: string;
  id: string;
  type: string;
  value: string;
  effect: string;
}
