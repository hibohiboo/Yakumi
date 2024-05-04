import { Button, Checkbox } from '@blueprintjs/core';
import { useSpreadPageHooks } from '@yakumi-app/hooks/spreadPageHooks';
import { AttributeCard, BackCard } from '@yakumi-components/index';
import { createRef } from 'react';

function SpreadSheetPage() {
  const vm = useSpreadPageHooks();

  vm.items.forEach((_, i) => {
    vm.listRefs.current[i] = createRef<HTMLDivElement>();
  });

  return (
    <div style={{ margin: '1rem' }}>
      <h1>スプレッドシートデッキ作成</h1>
      <details>
        <summary>スプレッドシート設定</summary>
        <a
          href="https://docs.google.com/spreadsheets/d/1pN7Bb75JTuX4ukiRsvEehw57IPFW5qOHo8_xvV3aNMI/"
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
        <details>
          <summary>デッキ情報</summary>
          <div>
            <label>
              デッキ名:
              <input
                type="text"
                name="deckName"
                defaultValue={vm.setting.deckName}
                onChange={vm.changeDeckName}
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
        <Checkbox
          checked={vm.isRandom}
          onChange={vm.changeIsRandom}
          label="ランダムカードとしてDL"
        />
        <Button icon="download" type="submit">
          {vm.isRandom
            ? 'Udonarium用ランダムカードダウンロード'
            : 'Udonarium用カードダウンロード'}
        </Button>
      </form>
      <details style={{ margin: '10px' }}>
        <summary>ココフォリア用 JSON</summary>
        <div>
          <input value={JSON.stringify(vm.ccfoliaJson)} readOnly />
          <button
            onClick={() => {
              if (navigator.clipboard)
                navigator.clipboard.writeText(JSON.stringify(vm.ccfoliaJson));
            }}
          >
            クリップボードにcopy
          </button>
          <p>
            ※ココフォリア用JSONはクリップボードにコピー後、ココフォリアのルームで貼り付けてください
          </p>
        </div>
      </details>

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
            <AttributeCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpreadSheetPage;
