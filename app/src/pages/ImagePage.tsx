import { Button } from '@blueprintjs/core';
import { csvToSettings } from '@yakumi-app/domain/card/csvToSettings';
import { ImageCardWithFile, Settings } from '@yakumi-app/domain/card/types';
import {
  reOpenImageDirectory,
  selectImageDirectory,
} from '@yakumi-app/domain/fileSystem/imageCardFileReader';
import { createImageDeckToUdonarium } from '@yakumi-app/domain/imageDeck/useUdonarium';
import { basePath } from '@yakumi-app/router';
import { useState } from 'react';

function ImagePge() {
  const [items, setItems] = useState<ImageCardWithFile[]>([]);
  const [setting, setSetting] = useState<Settings>({
    deckName: 'サンプル',
    size: '1',
    description: '',
    state: '0',
  });

  return (
    <div>
      <a href={`/${basePath}/sample-text-deck.zip`}>
        <Button icon="download">サンプルzipダウンロード</Button>
      </a>
      <span style={{ marginLeft: '10px' }}>
        ダウンロード後、解凍してください。
      </span>
      <div>
        <Button
          icon="folder-open"
          onClick={async () => {
            try {
              const result = await selectImageDirectory();
              if (!result) return;
              const { settings, cardListWithFile } = result;

              setItems(cardListWithFile);
              setSetting(csvToSettings(settings));
            } catch (e) {
              alert(e);
            }
          }}
        >
          フォルダ選択
        </Button>
        <span style={{ marginLeft: '10px' }}>
          解凍してできたフォルダを選択してください。
        </span>
      </div>

      {items.length !== 0 && (
        <div>
          <Button
            icon="refresh"
            onClick={async () => {
              try {
                const result = await reOpenImageDirectory();
                if (!result) return;
                const { settings, cardListWithFile } = result;
                setItems(cardListWithFile);
                setSetting(csvToSettings(settings));
              } catch (e) {
                console.log(e);
              }
            }}
          >
            再読み込み
          </Button>
          <span style={{ marginLeft: '10px' }}>
            テキストファイルを編集したり、画像を差し替えた場合は再読み込みしてください。
          </span>
        </div>
      )}
      {items.length !== 0 && (
        <div>
          <Button
            icon="refresh"
            onClick={async () => {
              if (items.length === 0) return;
              await createImageDeckToUdonarium(items, setting);
            }}
          >
            Udonarium用カードダウンロード
          </Button>
        </div>
      )}

      <div
        style={{
          background: 'white',
          color: 'black',
          gap: '1rem',
          padding: '1rem',
        }}
      >
        {items.length === 0 && (
          <div>フォルダを選択するとここにカード一覧が表示されます</div>
        )}
        {items.map((item, i) => (
          <div key={i}>
            <strong>{item.name}</strong>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <img src={item.backUrl} />
              <img src={item.frontUrl} />
              <pre>{item.description}</pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImagePge;
