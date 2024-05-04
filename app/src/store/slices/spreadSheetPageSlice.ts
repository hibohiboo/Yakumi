import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SpreadSheetPageState {
  spreadSheetId: string;
  sheetName: string;
  range: string;
}

const searchParams = new URLSearchParams(window.location.search);
const initialState: SpreadSheetPageState = {
  spreadSheetId:
    searchParams.get('id') || '1pN7Bb75JTuX4ukiRsvEehw57IPFW5qOHo8_xvV3aNMI',
  sheetName: searchParams.get('sheet') || 'デッキパーツ',
  range: 'A3:F20',
};

const spreadSheetPageSlice = createSlice({
  name: 'spreadSheetPage',
  initialState,
  reducers: {
    setSheetInfo: (state, action: PayloadAction<SpreadSheetPageState>) => {
      state.spreadSheetId = action.payload.spreadSheetId;
      state.sheetName = action.payload.sheetName;
      state.range = action.payload.range;
    },
  },
  selectors: { spreadSheetSelector: (state) => state },
});

export const { setSheetInfo } = spreadSheetPageSlice.actions;
export const { spreadSheetSelector } = spreadSheetPageSlice.selectors;
export default spreadSheetPageSlice.reducer;
