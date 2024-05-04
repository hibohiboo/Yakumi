/* eslint-disable @typescript-eslint/no-explicit-any */
import { canvasToFile } from '@yakumi-app/domain/udonarium/canvas';
import { createZip, getDoc } from '@yakumi-app/domain/udonarium/common';
import { createElement } from '@yakumi-app/domain/udonarium/fileArchiver';
import { createXML } from '@yakumi-app/domain/udonarium/udonariumZip';
import html2canvas from 'html2canvas';

export const createVSRankUdonariumMap = async (mapRef: any) => {
  const map = await canvasToFile(await html2canvas(mapRef.current));
  const doc = getDoc();
  const root = createTableRootElement(doc, map.identifier);
  const xml = createXML('ランク戦マップ', doc, root);
  await createZip([map.file, xml], '戦闘マップ');
};
function createTableRootElement(doc: XMLDocument, imageIdentifier: string) {
  const char = createElement(doc, 'game-table', [
    ['face', '1'],
    ['name', 'ランク戦マップ'],
    ['width', '20'],
    ['height', '15'],
    ['gridSize', '50'],
    ['imageIdentifier', imageIdentifier],
    ['backgroundImageIdentifier', 'imageIdentifier'],
    ['backgroundFilterType', ''],
    ['selected', 'true'],
    ['gridType', '0'],
    ['gridColor', '#000000e6'],
  ]);
  return char;
}
