import { Button } from '@blueprintjs/core';
import { selectDirectory } from './domain/fileSystem/fileReader';
function App() {
  return (
    <div>
      <Button
        icon="refresh"
        onClick={() => {
          selectDirectory();
        }}
      >
        ファイル読み込み
      </Button>
    </div>
  );
}

export default App;
