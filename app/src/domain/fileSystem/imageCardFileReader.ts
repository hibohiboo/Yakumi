import { csvToImageCards } from '../card/csvToImageCards';
import { ImageCardWithFile } from '../card/types';
import { reOpenDirectory, readDataUrl, selectDirectory } from './fileReader';

export async function selectImageDirectory() {
  return selectDirectory(accessImageDirectory);
}
export async function reOpenImageDirectory() {
  return reOpenDirectory(accessImageDirectory);
}
async function accessImageDirectory(handle: FileSystemDirectoryHandle) {
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
  const cardList = csvToImageCards(text);
  const dirHandle = await handle.getDirectoryHandle('images');
  const cardListWithFile: ImageCardWithFile[] = await Promise.all(
    cardList.map(async (card) => {
      let backFileHandle: FileSystemFileHandle;
      let frontFileHandle: FileSystemFileHandle;
      try {
        backFileHandle = await dirHandle.getFileHandle(`${card.back}.png`);
      } catch (e) {
        throw new Error(
          `画像ファイルがimagesフォルダに含まれていません.[${card.back}.png]`,
        );
      }
      const backFile = await backFileHandle.getFile();
      const backUrl = await readDataUrl(backFile);
      try {
        frontFileHandle = await dirHandle.getFileHandle(`${card.front}.png`);
      } catch (e) {
        throw new Error(
          `画像ファイルがimagesフォルダに含まれていません.[${card.front}.png]`,
        );
      }

      const frontFile = await frontFileHandle.getFile();
      const frontUrl = await readDataUrl(frontFile);
      return { ...card, frontFile, backFile, frontUrl, backUrl };
    }),
  );
  return { cardListWithFile, settings };
}
