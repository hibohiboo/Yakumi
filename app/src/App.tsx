import { Button } from '@blueprintjs/core';
import { AttributeCard, BackCard } from '@yakumi-components/index';
import { selectDirectory } from './domain/fileSystem/fileReader';

function App() {
  return (
    <div>
      <div style={{ color: '#eeeeee' }}>
        <Button
          icon="folder-open"
          onClick={() => {
            selectDirectory();
          }}
        >
          フォルダ選択
        </Button>{' '}
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
        <BackCard url="https://lostrpg-751c1.firebaseapp.com/assets/images/monster/debudori.png" />
        <AttributeCard name="a" content="b" id="c" type="d" />
      </div>
    </div>
  );
}

export default App;
