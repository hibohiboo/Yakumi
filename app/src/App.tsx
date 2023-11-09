import { selectDirectory } from './domain/fileSystem/fileReader';

function App() {
  return (
    <div>
      <button
        onClick={() => {
          selectDirectory();
        }}
      >
        ファイルを読み込む。
      </button>
    </div>
  );
}

export default App;
