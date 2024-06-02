import {
  Button,
  Dialog,
  DialogBody,
  Switch,
  TextArea,
} from '@blueprintjs/core';
import {
  AttributeSimpleCard,
  BackCard,
  FallMagiaAttributeCardDescription,
  UdonariumMap,
} from '@yakumi-components/index';
import { createRef, useCallback, useId, useState } from 'react';
import { FallMagiaCharacterPageViewModel } from '../../hooks/fallMagiaCharacterPageHooks';
import { Factions } from '../molecules/Factions';
import { CardList } from './components/CardList';
import { FlatCardList } from './components/FlatCardList';

const VSRankCharacterForm: React.FC<{
  vm: FallMagiaCharacterPageViewModel;
}> = ({ vm }) => {
  vm.items.forEach((item) => {
    vm.listRefs.current[item.index] = createRef<HTMLDivElement>();
  });
  const [isOpened, setIsOpened] = useState(false);
  const handleButtonClick = useCallback(
    () => setIsOpened(!isOpened),
    [isOpened],
  );
  const handleClose = useCallback(() => setIsOpened(false), []);
  const buttonRef = createRef<HTMLButtonElement>();

  const [isFlat, setIsFlat] = useState(false);
  const switchId = useId();
  return (
    <div style={{ margin: '1rem' }}>
      <form onSubmit={vm.handleSubmit}>
        <div>
          魔法名:
          <input
            name="characterName"
            onChange={vm.onCharacterNameChange}
            value={vm.characterName}
          />
          <div>
            <label>
              キャラクター画像設定：
              <input
                id="charImageChange"
                accept="image/*"
                type="file"
                name="characterImage"
                onChange={vm.onCharacterSrcChange}
              />
            </label>
          </div>
        </div>
        <div style={{ marginTop: '1rem' }}>
          所属 : {vm.characterFaction?.label}
          <Factions
            style={{
              display: 'flex',
              marginBottom: '1rem',
            }}
            items={vm.scene4SelectItems}
            selectedItem={vm.characterFaction}
            setItem={vm.setFactionHandler}
          />
        </div>
        <div>
          <h3>ギャップ</h3>

          <details open={false}>
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
              {vm.cardListGap.map((item) => (
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
        <div>
          <div>設定</div>
          <TextArea
            value={vm.characterMemo}
            onChange={vm.memoHandler}
            style={{ width: '30rem', height: '5rem' }}
          />
        </div>
        <Button
          icon="info-sign"
          onClick={handleButtonClick}
          text={'カードの見方'}
          small={true}
        />
        <Button
          icon="download"
          type="submit"
          style={{ margin: '5px' }}
          ref={buttonRef}
        >
          Udonarium用コマ&デッキダウンロード
        </Button>
      </form>
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

      {isFlat && <FlatCardList vm={vm} />}
      <div
        style={
          isFlat ? { width: '1px', height: '1px', overflow: 'hidden' } : {}
        }
      >
        <CardList vm={vm} />
      </div>
      <Button
        icon="download"
        type="submit"
        style={{ margin: '5px' }}
        onClick={() => {
          buttonRef.current?.click();
        }}
      >
        Udonarium用コマ&デッキダウンロード
      </Button>
      <div>
        <label>
          カード裏画像設定：
          <input
            id="backImageChange"
            accept="image/*"
            type="file"
            onChange={vm.backImageChange}
          />
        </label>
      </div>
      <div
        style={{ background: 'white', color: 'black', width: 'fit-content' }}
      >
        <div ref={vm.backRef} style={{ width: 'fit-content' }}>
          <BackCard url={vm.url} />
        </div>
      </div>
      <details>
        <summary>マップ</summary>
        <div
          ref={vm.mapRef}
          style={{ background: 'white', width: 'fit-content' }}
        >
          <UdonariumMap />
        </div>
      </details>
      <Dialog isOpen={isOpened} onClose={handleClose} style={{ width: '80vw' }}>
        <DialogBody>
          <div style={{ color: '#000' }}>
            <FallMagiaAttributeCardDescription />
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default VSRankCharacterForm;
