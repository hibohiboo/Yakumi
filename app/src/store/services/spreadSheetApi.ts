import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { spreadSheetKey } from '@yakumi-app/constants';
import { SpreadSheetResponse } from '@yakumi-app/domain/spreadSheet/types';

const baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets/';
interface GestSpreadSheetDataProps {
  spreadSheetId: string;
  sheetName: string;
  range: string;
}

export const spreadSheetApi = createApi({
  reducerPath: 'spreadSheetApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getSheetData: builder.query<SpreadSheetResponse, GestSpreadSheetDataProps>({
      query: ({ spreadSheetId, sheetName, range }) =>
        `${spreadSheetId}/values/${sheetName}!${range}?key=${spreadSheetKey}`,
    }),
  }),
});

export const { useGetSheetDataQuery } = spreadSheetApi;
