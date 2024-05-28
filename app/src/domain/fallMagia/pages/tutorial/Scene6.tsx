import { Button, Dialog, DialogBody, Switch } from '@blueprintjs/core';
import { FallMagiaAttributeCardDescription } from '@yakumi-components/index';
import { useCallback, useId, useState } from 'react';
import { Link } from 'react-router-dom';
import BaseWrapper from '../../components/atoms/BaseWrapper/BaseWrapper';
import NextButton from '../../components/atoms/NextButton';
import { CardList } from '../../components/characterForm/components/CardList';
import { FlatCardList } from '../../components/characterForm/components/FlatCardList';
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

  const [isFlat, setIsFlat] = useState(false);
  const switchId = useId();
  return (
    <BaseWrapper>
      <div style={centerStyle}>
        <div style={{ position: 'relative', width: '100%' }}>
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
            <div style={{ display: 'flex' }}>
              <label htmlFor={switchId}>カードで見る</label>
              <Switch
                id={switchId}
                style={{ marginLeft: '0.5rem' }}
                label="表で見る"
                onChange={(e) => {
                  setIsFlat(e.target.checked);
                }}
              />
            </div>
            <div
              style={{ overflowX: 'auto', width: '100%', position: 'relative' }}
            >
              <div style={{ width: 'fix-content', padding: '10px' }}>
                {isFlat && <FlatCardList vm={vm} />}
              </div>
            </div>
            <div
              style={
                isFlat
                  ? { width: '1px', height: '1px', overflow: 'hidden' }
                  : {}
              }
            >
              <CardList vm={vm} />
            </div>
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
