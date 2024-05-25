import { rubyText } from '@yakumi-components/components/atoms/rubyText';
import FallMagiaCardTable from './Table';
import { factions } from './constants';
import styles from './index.module.css';
import {
  CPOffCard,
  CharacterSheetDetailsProp,
  CharacterSheetPropsCard,
  ExtraTag,
} from './types';

export default function FallMagiaCharacterPreviewer({
  name,
  props,
  cards,
  src,
  extraTags = [],
  memo,
  faction,
}: {
  name: string;
  src: string;
  props: CharacterSheetDetailsProp[];
  cards: CharacterSheetPropsCard[];
  faction: string;
  extraTags?: ExtraTag[];
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
  const gapCards = cards.filter((b) => b.cp < 0);
  const normalCards = cards.filter((b) => b.cp >= 0);
  const plusCp = normalCards.reduce((a, b) => a + b.cp, 0);
  const minusCP = gapCards.reduce((a, b) => a + b.cp, 0);
  const useCards = normalCards.filter((b) => b.timing !== '戦闘外');
  const flavorCards = normalCards.filter((b) => b.timing === '戦闘外');
  const factionObj = factions[faction as '幻獣界'];
  return (
    <div className={styles.wrapper}>
      <div style={{ display: 'flex' }}>
        <div style={{ alignSelf: 'center' }} title={factionObj.label}>
          {factionObj.icon}
        </div>
        <h3
          className={styles.name}
          dangerouslySetInnerHTML={{ __html: rubyText(name) }}
        />
      </div>
      <img src={src} height={100} />
      {props.map((prop, x) => (
        <table className={styles.table} key={x}>
          <caption>{prop.name}</caption>
          <tbody>
            {prop.items.map((item) => (
              <tr key={name}>
                <th>{item.name}</th>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
      <h3>取得カード (CP:{cp} )</h3>
      <p style={{ paddingLeft: '1rem' }}>
        使用CP: <strong>{plusCp}</strong>CP
      </p>
      <FallMagiaCardTable cards={useCards} />

      <p style={{ paddingLeft: '1rem' }}>戦闘外</p>
      <FallMagiaCardTable cards={flavorCards} />

      {minusCP < 0 && (
        <p style={{ paddingLeft: '1rem' }}>
          ギャップ : <strong>{minusCP}</strong>CP
        </p>
      )}
      <FallMagiaCardTable cards={gapCards} />

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
