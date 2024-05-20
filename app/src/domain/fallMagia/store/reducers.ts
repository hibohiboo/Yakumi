import fallMagiaCharacterPageSlice from './slices/fallMagiaCharacterPageSlice';
import fallMagiaCharacterSlice from './slices/fallMagiaCharacterSlice';

export const fallMagiaReducer = {
  [fallMagiaCharacterPageSlice.reducerPath]:
    fallMagiaCharacterPageSlice.reducer,
  [fallMagiaCharacterSlice.reducerPath]: fallMagiaCharacterSlice.reducer,
};
