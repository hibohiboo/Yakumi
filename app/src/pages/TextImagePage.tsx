import { Button } from '@blueprintjs/core';
import { basePath } from '@yakumi-app/constants';
import { csvToSettings } from '@yakumi-app/domain/card/csvToSettings';
import { Settings, TextImageCardWithUrl } from '@yakumi-app/domain/card/types';
import {
  reOpenTextImageDirectory,
  selectTextImageDirectory,
} from '@yakumi-app/domain/fileSystem/textImageCardFileReader';
import { createTextDeckToUdonarium } from '@yakumi-app/domain/textDeck/useUdonarium';

import { AttributeCard, BackCard } from '@yakumi-components/index';
import { createRef, useRef, useState } from 'react';

function TextImagePage() {
  const [items, setItems] = useState<TextImageCardWithUrl[]>([]);
  const [setting, setSetting] = useState<Settings>({
    deckName: 'サンプル',
    size: '1',
    description: '',
    state: '0',
  });
  const [file, setFile] = useState<string | null>(null);
  const listRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);
  items.forEach((_, i) => {
    listRefs.current[i] = createRef<HTMLDivElement>();
  });
  const backRef = useRef<HTMLDivElement>(null);
  return (
    <div>
      <h1>テキスト&画像カードデッキ作成</h1>
      <a href={`/${basePath}/assets/rooms/sample-text-image-deck.zip`}>
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
              const result = await selectTextImageDirectory();
              if (!result) return;
              const { cardListWithUrl, back, settings } = result;
              setItems(cardListWithUrl);
              setFile(back);
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

      {file && (
        <div>
          <Button
            icon="refresh"
            onClick={async () => {
              try {
                const result = await reOpenTextImageDirectory();
                if (!result) return;
                const { cardListWithUrl, back, settings } = result;
                setItems(cardListWithUrl);
                setFile(back);
                setSetting(csvToSettings(settings));
              } catch (e) {
                console.warn(e);
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
      {file && (
        <div>
          <Button
            icon="download"
            onClick={async () => {
              if (!listRefs.current) {
                console.warn('listRefs is undefined');
                return;
              }
              if (!backRef.current) {
                console.warn('backRef is undefined');
                return;
              }
              await createTextDeckToUdonarium(
                listRefs.current,
                items,
                backRef,
                setting,
              );
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
          display: 'flex',
          gap: '1rem',
          padding: '1rem',
          flexWrap: 'wrap',
        }}
      >
        {!file && <div>フォルダを選択するとここにカード一覧が表示されます</div>}

        {file && (
          <div ref={backRef} style={{ width: 'fit-content' }}>
            <BackCard url={file} />
          </div>
        )}

        {items.map((item, i) => (
          <div
            ref={listRefs.current[i]}
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

export default TextImagePage;
