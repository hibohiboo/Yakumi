import { Button } from '@blueprintjs/core';
import { csvToTextCards } from '@yakumi-app/domain/card/csvToTextCards';
import { TextCard } from '@yakumi-app/domain/card/types';
import {
  reOpenDirectory,
  selectDirectory,
} from '@yakumi-app/domain/fileSystem/fileReader';
import { basePath } from '@yakumi-app/router';
import { AttributeCard, BackCard } from '@yakumi-components/index';
import { useState } from 'react';

function App() {
  const [items, setItems] = useState<TextCard[]>([]);
  const [file, setFile] = useState<string | null>(null);
  return (
    <div>
      <a href={`/${basePath}/textDeck.zip`}>
        <Button icon="download">サンプルzipダウンロード</Button>
      </a>
      <span style={{ marginLeft: '10px' }}>
        解凍してください。back.pngとtext.csvが入っています。
      </span>
      <div>
        <Button
          icon="folder-open"
          onClick={async () => {
            try {
              const { text: csv, back } = await selectDirectory();
              setItems(csvToTextCards(csv));
              setFile(back);
            } catch (e) {
              console.log(e);
            }
          }}
        >
          フォルダ選択
        </Button>
        <span style={{ marginLeft: '10px' }}>
          back.pngとtext.csvが置いてあるフォルダを選択してください。
        </span>
      </div>
      {file && (
        <div>
          <Button
            icon="refresh"
            onClick={async () => {
              try {
                const result = await reOpenDirectory();
                if (!result) return;
                const { text: csv, back } = result;
                setItems(csvToTextCards(csv));
                setFile(back);
              } catch (e) {
                console.log(e);
              }
            }}
          >
            再読み込み
          </Button>
          <span style={{ marginLeft: '10px' }}>
            text.csvを編集したり、画像を差し替えた場合は再読み込みしてください。{' '}
          </span>
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
        {file && <BackCard url={file} />}
        {items.map((item, i) => (
          <AttributeCard {...item} key={i} />
        ))}
      </div>
    </div>
  );
}

export default App;
