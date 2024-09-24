/* eslint-disable @typescript-eslint/unified-signatures */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlobReader, BlobWriter, ZipWriter } from '@zip.js/zip.js';
import pkg from 'file-saver';
import { getCanvasBlob } from './canvas';
const { saveAs } = pkg;
interface MetaData {
  percent: number;
  currentFile: string;
}
type UpdateCallback = (metadata: MetaData) => void;
function toArrayOfFileList(fileList: FileList): File[] {
  const files: File[] = [];
  const length = fileList.length;
  for (let i = 0; i < length; i++) {
    files.push(fileList[i]);
  }
  return files;
}

export class FileArchiver {
  private static _instance: FileArchiver;
  static get instance(): FileArchiver {
    if (!FileArchiver._instance) FileArchiver._instance = new FileArchiver();
    return FileArchiver._instance;
  }
  save(files: File[], zipName: string): void;
  save(files: FileList, zipName: string): void;
  save(files: any, zipName: string): void {
    if (!files) return;

    this.generateBlob(files).then((blob) => saveAs(blob, zipName + '.zip'));
  }

  async generateBlob(
    files: File[],
    updateCallback?: UpdateCallback,
  ): Promise<Blob> {
    const saveFiles: File[] =
      files instanceof FileList ? toArrayOfFileList(files) : files;

    const zipWriter = new ZipWriter(new BlobWriter('application/zip'), {
      bufferedWrite: true,
    });

    let sumProgress = 0;
    let sumTotal = 0;
    await Promise.all(
      Array.from(saveFiles).map(async (file) => {
        let prevProgress = 0;
        sumTotal += file.size;
        zipWriter.add(file.name, new BlobReader(file), {
          async onprogress(progress) {
            sumProgress += progress - prevProgress;
            prevProgress = progress;
            const percent = (sumProgress * 100) / sumTotal;
            if (!updateCallback) return;
            updateCallback({ percent: percent, currentFile: file.name });
          },
        });
      }),
    );
    const blob = await zipWriter.close();

    return blob;
  }
  saveText(file: File) {
    saveAs(file);
  }
  saveBlob(blob: Blob, zipName: string) {
    saveAs(blob, zipName + '.zip');
  }
}

export const createDoc = () =>
  document.implementation.createDocument('', '', null);

const setAttributes = (e: Element, attributes: [string, string][]) => {
  attributes.forEach(([attr, val]) => {
    e.setAttribute(attr, val);
  });
};

export const createElement = (
  doc: Document,
  elm: string,
  attributes: [string, string][] = [],
  text: string | null = null,
) => {
  const e = doc.createElement(elm);
  setAttributes(e, attributes);
  if (text) {
    e.appendChild(document.createTextNode(text));
  }
  return e;
};

export const convertDocToXML = (doc: Document) => {
  const oSerializer = new XMLSerializer();
  const sXML = oSerializer.serializeToString(doc);
  return sXML;
};

/**
 * cors汚染されていないimgのみで使用可能
 * @param img img要素
 */
export const createImgBlob = async (img: HTMLImageElement) => {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('cannot get canvas context');
  context.drawImage(img, 0, 0);
  const blob = await getCanvasBlob(canvas);

  return blob;
};
