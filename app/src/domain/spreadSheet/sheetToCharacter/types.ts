export interface CharacterSheetPropsCard {
  id: string;
  name: string;
  content: string;
  type: string;
  sheetPropsName: string; // <data name="器用度">24</data> の器用度
  sheetPropsResourceName: string; // <data name="能力"><data name="器用度">の能力
  sheetPropsValue: string; // <data name="敏捷度">24</data>の24. またsheetPropsResourceTypeがnumberResourceの場合は数値とする。
  sheetPropsResourceType?: undefined | 'numberResource' | 'note';
  currentValue?: number | undefined; // リソースタイプがチェックの時には、 <data type="numberResource" currentValue="0" name="MP">1</data> とする
  count: number;
}

/**
 * datails.リソース.mp(type:numberResource)
   datails.能力.器用度
   の「リソース」「能力」の部分
 */
export interface CharacterSheetDetailsProp {
  name: string;
  items: CharacterSheetProp[];
}
/**
 * datails.リソース.mp(type:numberResource)
   datails.能力.器用度
   の「mp」「器用度」の部分
 */
export interface CharacterSheetProp {
  name: string;
  sheetPropsResourceType: undefined | 'numberResource' | 'note';
  value: string;
  currentValue: number | undefined; // numberResource のときのみ使用
}
