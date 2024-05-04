import { createSelector, createSlice } from '@reduxjs/toolkit';
import { CharacterSheetPropsCard } from '@yakumi-app/domain/spreadSheet/sheetToCharacter/types';
import { cardsToParameters } from '@yakumi-app/domain/spreadSheet/sheetToCharacter/udonarium/cardsToPatameters';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SpreadSheetPageState {
  spreadSheetId: string;
  sheetName: string;
  range: string;
  cardList: CharacterSheetPropsCard[];
}

const searchParams = new URLSearchParams(window.location.search);
const initialState: SpreadSheetPageState = {
  spreadSheetId:
    searchParams.get('id') || '1i9AMAxbPsFZglGgWQz606p8jEYhdzzjZB-3ojqgnwiY',
  sheetName: searchParams.get('sheet') || 'カード一覧',
  range: 'A4:H20',
  cardList: [],
};

const sheetToCharPageSlice = createSlice({
  name: 'sheetToCharPage',
  initialState,
  reducers: {
    setSheetInfo: (
      state,
      action: PayloadAction<
        Pick<SpreadSheetPageState, 'spreadSheetId' | 'range' | 'sheetName'>
      >,
    ) => {
      state.spreadSheetId = action.payload.spreadSheetId;
      state.sheetName = action.payload.sheetName;
      state.range = action.payload.range;
    },
    setCardList: (state, action: PayloadAction<CharacterSheetPropsCard[]>) => {
      state.cardList = action.payload;
    },
  },
  selectors: {
    spreadSheetSelector: ({ spreadSheetId, sheetName, range }) => ({
      spreadSheetId,
      sheetName,
      range,
    }),
    spreadSheetCardListSelector: (state) => state.cardList,
    selectedCards: (state) => state.cardList.filter((card) => card.count > 0),
  },
});

export const { setSheetInfo, setCardList } = sheetToCharPageSlice.actions;
export const {
  spreadSheetSelector,
  spreadSheetCardListSelector,
  selectedCards,
} = sheetToCharPageSlice.selectors;
export const characterParameters = createSelector(selectedCards, (cardList) =>
  cardsToParameters(cardList),
);
export default sheetToCharPageSlice.reducer;
