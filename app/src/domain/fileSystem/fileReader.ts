declare global {
  interface Window {
    showDirectoryPicker(): Promise<FileSystemDirectoryHandle>;
  }
}

/**
 * ブラウザからFile System Access APIを使い、ディレクトリにアクセスする。
 * ディレクトリ内のファイルを読み込む。
 * - text.csv
 * - back.png
 */
export async function selectDirectory() {
  const handle = await window.showDirectoryPicker();
  return await accessDirectory(handle);
}

/**
 * ディレクトリにアクセスする。
 * @param handle ディレクトリのハンドル
 */
async function accessDirectory(handle: FileSystemDirectoryHandle) {
  const textFileHandle = await handle.getFileHandle('text.csv');
  const text = await textFileHandle.getFile();
  const textContent = await text.text();

  const backFileHandle = await handle.getFileHandle('back.png');
  const backFile = await backFileHandle.getFile();
  const back = await new Promise<string>((resolve) => {
    // 画像ファイルをDataUrlに変換
    const reader = new FileReader();
    reader.readAsDataURL(backFile);
    reader.onload = () => {
      resolve(reader.result as string);
    };
  });

  return { text: textContent, back };
}
