import { AttributeSimpleCard } from '@yakumi-components/index';
import { Link } from 'react-router-dom';
import BaseWrapper from '../../components/atoms/BaseWrapper/BaseWrapper';
import NextButton from '../../components/atoms/NextButton';
import { useFallMagiaCharacterPageHooks } from '../../hooks/fallMagiaCharacterPageHooks';

const centerStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
} as const;

function FallMagiaTutorial7() {
  const vm = useFallMagiaCharacterPageHooks();

  const cpList = vm.selectedItems
    .filter((card) => card.tags.includes('ギャップ'))
    .map((card) => card.cp);
  const cp = cpList.reduce((a, b) => a + b, 0);
  return (
    <BaseWrapper>
      <div style={centerStyle}>
        <div>
          <div
            style={{
              whiteSpace: 'pre-wrap',
              textAlign: 'center',
              marginBottom: '1rem',
            }}
          >
            {`

「魔法少女の姿を決めてほしい」

「変更は後からでも受け付けるよ」

${cp < -50 ? '「トーナメントのレギュレーションでは-50までだよ」' : ''}
`}
          </div>
          <div style={centerStyle}>
            <Link to="/fall-magia/character/tutorial/main">
              <NextButton text="魔法少女になる" />
            </Link>
          </div>
          <div>CP: {cp}</div>
          <div style={{ marginBottom: '1rem', marginTop: '1rem' }}>
            {vm.cardListGap.map((obj) => {
              return (
                <div key={obj.type}>
                  <h3>{obj.label}</h3>
                  <details open={true}>
                    <summary>一覧</summary>
                    <div
                      style={{
                        background: 'white',
                        color: 'black',
                        display: 'flex',
                        gap: '1rem',
                        padding: '1rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      {obj.items.map((item) => (
                        <div
                          ref={vm.listRefs.current[item.index]}
                          key={item.index}
                          style={{ width: 'fit-content' }}
                        >
                          <AttributeSimpleCard
                            {...item}
                            onClick={() => vm.onCardClick(item.name)}
                            selected={item.count > 0 && !vm.isLoading}
                          />
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              );
            })}
          </div>

          <div
            style={{ whiteSpace: 'pre-wrap', padding: '1rem', color: 'black' }}
          >
            常識の檻から外れるほどに魔法少女は力を解放しやすくなる。
          </div>
        </div>
      </div>
    </BaseWrapper>
  );
}

export default FallMagiaTutorial7;
