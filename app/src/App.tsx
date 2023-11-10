import { selectDirectory } from '@app/domain/fileSystem/fileReader';
import { Button } from '@blueprintjs/core';
import { AttributeCard, BackCard } from '@yakumi-components/index';
import { useState } from 'react';
import { csvToTextCards } from './domain/card/csvToTextCards';
import { TextCard } from './domain/card/types';

function App() {
  const [items, setItems] = useState<TextCard[]>([]);
  const [file, setFile] = useState<string | null>(null);
  return (
    <div>
      <div style={{ color: '#eeeeee' }}>
        <Button
          icon="folder-open"
          onClick={async () => {
            const { text: csv, back } = await selectDirectory();
            setItems(csvToTextCards(csv));
            setFile(back);
          }}
        >
          フォルダ選択
        </Button>
        back.pngとtext.csvが置いてあるフォルダを選択してください
      </div>
      <div
        style={{
          background: 'white',
          display: 'flex',
          gap: '1rem',
          padding: '1rem',
        }}
      >
        {file && <BackCard url={file} />}
        {items.map((item, i) => (
          <AttributeCard {...item} key={i} />
        ))}
      </div>
    </div>
  );
}

export default App;
