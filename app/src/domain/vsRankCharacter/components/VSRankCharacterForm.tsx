import { Button, Dialog, DialogBody } from '@blueprintjs/core';
import { UseVSRankCharacterPageViewModel } from '@yakumi-app/hooks/vsRankCharacterPageHooks';
import {
  AttributeCardDescription,
  BackCard,
  UdonariumMap,
  VSAttributeCard,
} from '@yakumi-components/index';
import { createRef, useCallback, useState } from 'react';

const VSRankCharacterForm: React.FC<{
  vm: UseVSRankCharacterPageViewModel;
}> = ({ vm }) => {
  vm.items.forEach((_, i) => {
    vm.listRefs.current[i] = createRef<HTMLDivElement>();
  });
  const [isOpened, setIsOpened] = useState(false);
  const handleButtonClick = useCallback(
    () => setIsOpened(!isOpened),
    [isOpened],
  );
  const handleClose = useCallback(() => setIsOpened(false), []);
  const buttonRef = createRef<HTMLButtonElement>();
  return (
    <div style={{ margin: '1rem' }}>
      <form onSubmit={vm.handleSubmit}>
        <div>
          キャラクター名:
          <input
            name="characterName"
            onChange={vm.onCharacterNameChange}
            defaultValue={vm.characterName}
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

      {vm.itemsWithTypes.map((obj) => {
        return (
          <div key={obj.type}>
            <h3>{obj.label}</h3>
            <details open={obj.type === 'A'}>
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
            <AttributeCardDescription />
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default VSRankCharacterForm;
