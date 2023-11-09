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
  const textFile = await handle.getFileHandle('text.csv');
  const text = await textFile.getFile();
  const textContent = await text.text();
  console.log(textContent);

  const backFile = await handle.getFileHandle('back.png');
  const back = await backFile.getFile();
  console.log(back);
  return [textContent, back];
}
