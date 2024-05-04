import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { spreadSheetApi } from './services/spreadSheetApi';

export const store = configureStore({
  reducer: {
    ...rootReducer,
    [spreadSheetApi.reducerPath]: spreadSheetApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(spreadSheetApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
