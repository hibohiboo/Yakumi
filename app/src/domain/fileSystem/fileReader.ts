declare global {
  interface Window {
    showDirectoryPicker(): Promise<FileSystemDirectoryHandle>;
  }
}
let handle: FileSystemDirectoryHandle;
/**
 * ブラウザからFile System Access APIを使い、ディレクトリにアクセスする。
 * ディレクトリ内のファイルを読み込む。
 * - text.csv
 * - back.png
 */
export async function selectTextDirectory() {
  return selectDirectory(accessTextDirectory);
}
export async function reOpenTextDirectory() {
  if (!handle) return;
  return await accessTextDirectory(handle);
}

export async function selectDirectory<T>(
  accessDirectory: (handle: FileSystemDirectoryHandle) => Promise<T>,
) {
  try {
    handle = await window.showDirectoryPicker();
  } catch (e) {
    console.log(e);
    return;
  }
  return await accessDirectory(handle);
}
export function readDataUrl(file: File) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result as string);
    };
  });
}
/**
 * ディレクトリにアクセスする。
 * @param handle ディレクトリのハンドル
 */
async function accessTextDirectory(handle: FileSystemDirectoryHandle) {
  try {
    const textFileHandle = await handle.getFileHandle('text.csv');
    const text = await textFileHandle.getFile();
    const textContent = await text.text();

    const settingsFileHandle = await handle.getFileHandle('settings.txt');
    const settings = await settingsFileHandle.getFile();
    const settingsContent = await settings.text();

    const backFileHandle = await handle.getFileHandle('back.png');
    const backFile = await backFileHandle.getFile();
    const back = await readDataUrl(backFile);

    return { text: textContent, back, settings: settingsContent };
  } catch (e) {
    throw new Error('text.csv,settings.txt,back.pngが含まれていません');
  }
}
