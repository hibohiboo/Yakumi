import { rubyText } from '@yakumi-components/components/atoms/rubyText';
import styles from './index.module.css';
import { CharacterSheetPropsCard } from './types';

export default function FallMagiaCardTable({
  cards,
}: {
  cards: CharacterSheetPropsCard[];
}) {
  return (
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
            <td dangerouslySetInnerHTML={{ __html: rubyText(card.content) }} />
            <td>{card.countdown}</td>
            <td>{card.cost}</td>
            <td>{card.tags.join(',')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
