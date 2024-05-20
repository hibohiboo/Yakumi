import { HttpResponse, http } from 'msw';
import extraTags from './responses/extraTags.json';
import { charater } from './responses/getCharacter';
import magia from './responses/magia.json';
import random from './responses/random.json';
import sheetToChar from './responses/sheetToChar.json';
import spreadSheet from './responses/spreadsheet.json';
import typeList from './responses/typeList.json';
import typeListMagia from './responses/typeListMagia.json';
import vsRank from './responses/vsRank.json';

const getSheetData = (id: string, sheet: string) => {
  if (
    sheet === 'カード区分!A1:B30' &&
    id === '1lRoDfjaU3MZW7z0KYrAxIHwIren-QNQU9w36_l6WgNI'
  ) {
    return typeListMagia;
  } else if (sheet === 'カード区分!A1:B30') {
    return typeList;
  } else if (sheet === 'Extraタグ!A3:E30') {
    return extraTags;
  }
  if (id === '15UeHr3-Q_WLIoZ5943fKumH2aIjViKkmXbajVwEoPjw') {
    return vsRank;
  }
  if (id === '1lRoDfjaU3MZW7z0KYrAxIHwIren-QNQU9w36_l6WgNI') {
    return magia;
  } else if (
    id === '1pN7Bb75JTuX4ukiRsvEehw57IPFW5qOHo8_xvV3aNMI' &&
    sheet.includes('ランダム表')
  ) {
    return random;
  } else if (id === '1pN7Bb75JTuX4ukiRsvEehw57IPFW5qOHo8_xvV3aNMI') {
    return sheetToChar;
  }
  return spreadSheet;
};

export const handlers = [
  http.get(
    'https://sheets.googleapis.com/v4/spreadsheets/:id/values/:sheet',
    ({ params }) => {
      const json = getSheetData(params.id as string, params.sheet as string);
      return new HttpResponse(JSON.stringify(json), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    },
  ),
  http.get(
    'http://localhost:5173/data-api/rest/YakumiCharacter/id/:id?$select=data',
    () => {
      return new HttpResponse(JSON.stringify(charater), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    },
  ),
];
