import { fallMagiaReducer } from '@yakumi-app/domain/fallMagia/store/reducers';
import sheetToCharPageReducer from './slices/sheetToCharPageSlice';
import spreadSheetPageReducer from './slices/spreadSheetPageSlice';
import userSlice from './slices/userSlice';
import vsRankCharacterPageSlice from './slices/vsRankCharacterPageSlice';

export const rootReducer = {
  spreadSheetPage: spreadSheetPageReducer,
  sheetToCharPage: sheetToCharPageReducer,
  [userSlice.reducerPath]: userSlice.reducer,
  [vsRankCharacterPageSlice.reducerPath]: vsRankCharacterPageSlice.reducer,
  ...fallMagiaReducer,
};
