import { Button, Dialog, DialogBody } from '@blueprintjs/core';
import {
  FallMagiaAttributeCardDescription,
  VSAttributeCard,
} from '@yakumi-components/index';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import BaseWrapper from '../../components/atoms/BaseWrapper/BaseWrapper';
import NextButton from '../../components/atoms/NextButton';
import { useFallMagiaCharacterPageHooks } from '../../hooks/fallMagiaCharacterPageHooks';

const centerStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
} as const;

function FallMagiaTutorial6() {
  const vm = useFallMagiaCharacterPageHooks();
  const [isOpened, setIsOpened] = useState(false);
  const handleButtonClick = useCallback(
    () => setIsOpened(!isOpened),
    [isOpened],
  );
  const handleClose = useCallback(() => setIsOpened(false), []);
  // CP軽減を行う計算
  const hasCpOffCards = vm.selectedItems.flatMap((card) =>
    card.effectType === 'cpOff' && card.effectVariable ? card : [],
  );

  const cpList = vm.selectedItems
    .filter((card) => !card.tags.includes('ギャップ'))
    .map((card) => {
      if (hasCpOffCards.some((b) => card.tags.includes(b.effectVariable!)))
        return Math.max(card.cp - 5, 1); // 最低値1
      return card.cp;
    });
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

「基本的な魔法はこちらで用意させてもらったよ」

「あとは魔法界に共通する魔法と固有の魔法から選んでほしい」

`}
          </div>
          <div style={centerStyle}>
            <Link to="/fall-magia/character/tutorial/7">
              <NextButton text="ギャップを選ぶ" />
            </Link>
          </div>
          <Button
            icon="info-sign"
            onClick={handleButtonClick}
            text={'カードの見方'}
            small={true}
          />
          <div>CP: {cp}</div>
          <div style={{ marginBottom: '1rem', marginTop: '1rem' }}>
            {vm.itemsWithTypes.map((obj) => {
              return (
                <div key={obj.type}>
                  <h3>{obj.label}</h3>
                  <details open={false}>
                    <summary>カード一覧</summary>
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
                          <VSAttributeCard
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
            魔法のアイディアはいつでも募集しているよ。 hibohiboo
            に伝えてみてね。
          </div>
        </div>
      </div>
      <Dialog isOpen={isOpened} onClose={handleClose} style={{ width: '80vw' }}>
        <DialogBody>
          <div style={{ color: '#000' }}>
            <FallMagiaAttributeCardDescription />
          </div>
        </DialogBody>
      </Dialog>
    </BaseWrapper>
  );
}

export default FallMagiaTutorial6;
