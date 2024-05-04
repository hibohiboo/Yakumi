import { Button, Dialog, DialogBody, Spinner } from '@blueprintjs/core';
import { useSheetToCharPageHooks } from '@yakumi-app/hooks/sheetToCharPageHooks';
import { AttributeCard, BackCard } from '@yakumi-components/index';
import { createRef } from 'react';

function SheetToCharPage() {
  const vm = useSheetToCharPageHooks();

  vm.items.forEach((_, i) => {
    vm.listRefs.current[i] = createRef<HTMLDivElement>();
  });

  return (
    <div style={{ margin: '1rem' }}>
      <h1>スプレッドシートキャラクターデッキ作成</h1>
      <details style={{ marginBottom: '1rem' }}>
        <summary>スプレッドシート設定</summary>
        <a
          href="https://docs.google.com/spreadsheets/d/1i9AMAxbPsFZglGgWQz606p8jEYhdzzjZB-3ojqgnwiY/"
          target="_blank"
          style={{ color: 'white', padding: '0.5rem', display: 'block' }}
        >
          サンプルシート
        </a>
        <div>
          <form onSubmit={vm.sheetInfoSubmit}>
            <label>
              スプレッドシートID:
              <input
                type="text"
                name="spreadSheetId"
                defaultValue={vm.state.spreadSheetId}
                style={{ width: '23rem' }}
              />
            </label>
            <label>
              シート名:
              <input
                type="text"
                name="sheetName"
                defaultValue={vm.state.sheetName}
              />
            </label>
            <label>
              範囲:
              <input
                type="text"
                name="range"
                defaultValue={vm.state.range}
                style={{ marginRight: '1rem' }}
              />
            </label>
            <Button icon="refresh" type="submit">
              シート情報再読み込み
            </Button>
          </form>
        </div>
      </details>
      <form onSubmit={vm.handleSubmit}>
        <details style={{ display: 'none' }}>
          <summary>デッキ情報</summary>
          <div>
            <label>
              デッキ名:
              <input
                type="text"
                name="deckName"
                defaultValue={vm.setting.deckName}
              />
            </label>

            <label>
              デッキ説明:
              <textarea
                name="description"
                rows={5}
                cols={60}
                defaultValue={vm.setting.description}
              />
            </label>
            <label>
              サイズ:
              <input
                type="text"
                name="size"
                defaultValue={vm.setting.size}
                style={{ width: '1rem', marginRight: '1rem' }}
              />
            </label>
          </div>
        </details>
        <div>
          キャラクター名:{' '}
          <input name="characterName" defaultValue={'サンプルキャラクター'} />
          <div>
            <label>
              キャラクター画像設定：
              <input
                id="charImageChange"
                accept="image/*"
                type="file"
                name="characterImage"
              />
            </label>
          </div>
        </div>

        <Button icon="download" type="submit" style={{ margin: '5px' }}>
          Udonarium用コマ&デッキダウンロード
        </Button>
      </form>
      <div>
        <label>
          カード裏画像設定：{' '}
          <input
            id="backImageChange"
            accept="image/*"
            type="file"
            onChange={vm.backImageChange}
          />
        </label>
      </div>
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
        <div ref={vm.backRef} style={{ width: 'fit-content' }}>
          <BackCard url={vm.url} />
        </div>

        {vm.items.map((item, i) => (
          <div
            ref={vm.listRefs.current[i]}
            key={i}
            style={{ width: 'fit-content' }}
          >
            <AttributeCard
              {...item}
              onClick={() => vm.onCardClick(i)}
              selected={item.count > 0 && !vm.isLoading}
            />
          </div>
        ))}
      </div>
      <Dialog isOpen={vm.isLoading}>
        <DialogBody useOverflowScrollContainer={false}>
          <Spinner intent="primary" size={50} />
          <span style={{ color: '#000' }}>キャラクターシート出力中...</span>
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default SheetToCharPage;
