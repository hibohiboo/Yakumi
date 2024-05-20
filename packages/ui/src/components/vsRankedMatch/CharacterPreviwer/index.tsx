import { rubyText } from '@yakumi-components/components/atoms/rubyText';
import styles from './index.module.css';
import {
  CPOffCard,
  CharacterSheetDetailsProp,
  CharacterSheetPropsCard,
  ExtraTag,
} from './types';

export default function CharacterPreviewer({
  name,
  props,
  cards,
  src,
  extraTags = [],
  memo,
}: {
  name: string;
  src: string;
  props: CharacterSheetDetailsProp[];
  cards: CharacterSheetPropsCard[];
  extraTags: ExtraTag[];
  memo?: string;
}) {
  // CP軽減を行う計算
  const hasCpOffCards = cards.flatMap((card) =>
    card.effectType === 'cpOff' && card.effectVariable
      ? (card as CPOffCard)
      : [],
  );

  const cpList = cards.map((card) => {
    if (hasCpOffCards.some((b) => card.tags.includes(b.effectVariable)))
      return Math.max(card.cp - 5, 1); // 最低値1
    return card.cp;
  });
  const cp = cpList.reduce((a, b) => a + b, 0);
  const minusCP = cards.filter((b) => b.cp < 0).reduce((a, b) => a + b.cp, 0);
  return (
    <div className={styles.wrapper}>
      <h3
        className={styles.name}
        dangerouslySetInnerHTML={{ __html: rubyText(name) }}
      />
      <img src={src} height={100} />
      {props.map((prop, x) => (
        <table className={styles.table} key={x}>
          <caption>{prop.name}</caption>
          <tbody>
            {prop.items.map((item, i) => (
              <tr key={i}>
                <th>{item.name}</th>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
      <h3>取得カード (CP:{cp} )</h3>
      {minusCP < 0 && (
        <p style={{ paddingLeft: '1rem' }}>
          マイナスCP ( -50まで ):<strong>{minusCP}</strong>
        </p>
      )}
      <table className={`${styles.table} ${styles.cardTable}`}>
        <tbody>
          <tr>
            <th>CP</th>
            <th>カード名</th>
            <th>効果</th>
            <th>CT</th>
            <th>コスト</th>
            <th>タグ</th>
          </tr>
          {cards.map((card, i) => (
            <tr key={i}>
              <td>{card.cp}</td>
              <td
                style={{
                  verticalAlign: 'center',
                  lineHeight: '1.5',
                  whiteSpace: 'nowrap',
                }}
                dangerouslySetInnerHTML={{ __html: rubyText(card.name) }}
              />
              <td
                dangerouslySetInnerHTML={{ __html: rubyText(card.content) }}
              />
              <td>{card.countdown}</td>
              <td>{card.cost}</td>
              <td>{card.tags.join(',')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {extraTags.length > 0 && (
        <div>
          <h3>補足</h3>
          {extraTags.map((tag, i) => (
            <div key={i}>
              <img src={tag.icon} style={{ width: '50px', height: '50px' }} />
              <strong>{tag.value}</strong>
              <p>{tag.effect}</p>
            </div>
          ))}
        </div>
      )}
      {memo && (
        <div>
          <h4>設定</h4>
          <p
            style={{ whiteSpace: 'pre-wrap' }}
            dangerouslySetInnerHTML={{ __html: rubyText(memo) }}
          />
        </div>
      )}
    </div>
  );
}
