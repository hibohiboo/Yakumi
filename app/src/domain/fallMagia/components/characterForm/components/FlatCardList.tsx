import { Checkbox } from '@blueprintjs/core';
import { FallMagiaCharacterPageViewModel } from '@yakumi-app/domain/fallMagia/hooks/fallMagiaCharacterPageHooks';
import { rubyText } from '@yakumi-components/index';
import styles from './FlatCardList.module.css';
export function FlatCardList({
  vm,
}: {
  vm: Pick<
    FallMagiaCharacterPageViewModel,
    'flatCards' | 'listRefs' | 'onCardClick' | 'isLoading'
  >;
}) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th>CP</th>
            <th>カード名</th>
            <th>タイミング</th>
            <th>CT</th>
            <th>対象</th>
            <th>射程</th>
            <th>コスト</th>
            <th>追加能力値</th>
            <th>効果</th>
            <th>タグ</th>
          </tr>
        </thead>
        <tbody>
          {vm.flatCards.map((item) => {
            return (
              <tr key={item.index} style={{ width: 'fit-content' }}>
                <td>
                  <Checkbox
                    onClick={() => vm.onCardClick(item.name)}
                    checked={item.count > 0}
                  />
                </td>
                <td>{item.cp}</td>
                <td dangerouslySetInnerHTML={{ __html: rubyText(item.name) }} />
                <td>{item.timing}</td>
                <td>{item.countdown}</td>
                <td>{item.target}</td>
                <td>{item.range}</td>
                <td>{item.cost}</td>
                <td>
                  {item.sheetPropsName} / {item.sheetPropsValue}
                </td>
                <td
                  dangerouslySetInnerHTML={{ __html: rubyText(item.content) }}
                />

                <td>{item.tags.join(',')}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
