import styles from './index.module.css';
/**
 * datails.リソース.mp(type:numberResource)
   datails.能力.器用度
   の「mp」「器用度」の部分
 */
interface CharacterSheetProp {
  name: string;
  sheetPropsResourceType: undefined | 'numberResource' | 'note';
  value: string;
  currentValue: number | undefined; // numberResource のときのみ使用
}
interface CharacterSheetPropsCard {
  id: string;
  type: string;
  name: string;
  content: string;
  src?: string;
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
interface CharacterSheetDetailsProp {
  name: string;
  items: CharacterSheetProp[];
}
export default function CharacterPreviewer({
  name,
  props,
  cards,
}: {
  name: string;
  props: CharacterSheetDetailsProp[];
  cards: CharacterSheetPropsCard[];
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.name}>{name}</div>
      {props.map((prop) => (
        <div>
          <h4 className={styles.title}>{prop.name}</h4>
          <ul>
            {prop.items.map((item) => (
              <li>
                {item.name}: {item.value}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <h3>取得カード</h3>
      <table className={`${styles.table} ${styles.cardTable}`}>
        <tbody>
          <tr>
            <th>種別</th>
            <th>カード名</th>
            <th>効果</th>
          </tr>
          {cards.map((card, i) => (
            <tr key={i}>
              <td>{card.type}</td>
              <td>{card.name}</td>
              <td>{card.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
