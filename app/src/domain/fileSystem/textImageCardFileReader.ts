import { csvToTextImageCards } from '../card/csvToTextImageCards';
import { TextImageCardWithUrl } from '../card/types';
import { reOpenDirectory, readDataUrl, selectDirectory } from './fileReader';

export async function selectTextImageDirectory() {
  return selectDirectory(accessTextImageDirectory);
}
export async function reOpenTextImageDirectory() {
  return reOpenDirectory(accessTextImageDirectory);
}
async function accessTextImageDirectory(handle: FileSystemDirectoryHandle) {
  let text = '';
  let settings = '';
  try {
    const textFileHandle = await handle.getFileHandle('text.csv');
    const textFile = await textFileHandle.getFile();
    text = await textFile.text();

    const settingsFileHandle = await handle.getFileHandle('settings.txt');
    const settingsFile = await settingsFileHandle.getFile();
    settings = await settingsFile.text();
  } catch (e) {
    throw new Error('text.csv,settings.txtが含まれていません');
  }
  const cardList = csvToTextImageCards(text);
  const dirHandle = await handle.getDirectoryHandle('images');
  const cardListWithUrl: TextImageCardWithUrl[] = await Promise.all(
    cardList.map(async (card) => {
      let frontFileHandle: FileSystemFileHandle;

      try {
        frontFileHandle = await dirHandle.getFileHandle(
          `${card.imageName}.png`,
        );
      } catch (e) {
        throw new Error(
          `画像ファイルがimagesフォルダに含まれていません.[${card.imageName}.png]`,
        );
      }

      const frontFile = await frontFileHandle.getFile();
      const frontUrl = await readDataUrl(frontFile);

      return { ...card, src: frontUrl };
    }),
  );
  const backFileHandle = await handle.getFileHandle('back.png');
  const backFile = await backFileHandle.getFile();
  const back = await readDataUrl(backFile);
  return { cardListWithUrl, settings, back };
}
