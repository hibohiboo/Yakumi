/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-class-members */
import pkg from 'file-saver';
const { saveAs } = pkg;
import JSZip from 'jszip';
import { getCanvasBlob } from './canvas';

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

    const zip = new JSZip();
    const length = files.length;
    for (let i = 0; i < length; i++) {
      const file = files[i];
      zip.file(file.name, file);
    }

    zip
      .generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: {
          level: 6,
        },
      })
      .then((blob) => saveAs(blob, zipName + '.zip'));
  }
  saveText(file: File) {
    saveAs(file);
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
