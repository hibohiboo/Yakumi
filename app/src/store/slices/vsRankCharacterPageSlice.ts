import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { getCharacter } from '@yakumi-app/domain/api/crud';
import { getImageSrc } from '@yakumi-app/domain/image/getImageSrc';
import { cardsToParameters } from '@yakumi-app/domain/spreadSheet/sheetToCharacter/udonarium/cardsToPatameters';
import { cardsToWithTypeList } from '@yakumi-app/domain/spreadSheet/sheetToCharacter/udonarium/cardsToWithTypeList';
import { getStorageAccountFilePath } from '@yakumi-app/domain/storageAccount/getFilePath';
import { uploadToStorageAccount } from '@yakumi-app/domain/storageAccount/uploadToStorageAccount';
import { uniqExtraList } from '@yakumi-app/domain/vsRankCharacter/extraTags/uniqExtraList';
import { createCharacterId } from '@yakumi-app/domain/vsRankCharacter/persistent/characterId';
import {
  SaveCharacterArgs,
  getCharacterIdList,
  saveCharacter,
} from '@yakumi-app/domain/vsRankCharacter/persistent/saveCharacter';
import {
  CharacterIdListItem,
  CharacterSheetPropsCard,
  ExtraTag,
} from '@yakumi-app/domain/vsRankCharacter/types';
import { AppDispatch, RootState } from '..';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CardTypeWithLabel {
  type: string;
  label: string;
}
interface VSRankCharacterPageState {
  characterId: string;
  characterName: string;
  characterSrc: string;
  spreadSheetId: string;
  sheetName: string;
  range: string;
  cardList: CharacterSheetPropsCard[];
  cardTypeList: CardTypeWithLabel[];
  extraTags: ExtraTag[];
  characterList: CharacterIdListItem[];
}

const searchParams = new URLSearchParams(window.location.search);

const initialState: VSRankCharacterPageState = {
  characterId: createCharacterId(),
  characterName: 'サンプル',
  characterSrc: getImageSrc(
    'assets/images/udonarium/outline_person_outline_black_24dp.png',
  ),
  spreadSheetId:
    searchParams.get('id') || '15UeHr3-Q_WLIoZ5943fKumH2aIjViKkmXbajVwEoPjw',
  sheetName: searchParams.get('sheet') || 'カード一覧',
  range: 'A4:R100',
  cardList: [],
  cardTypeList: [],
  extraTags: [],
  characterList: getCharacterIdList(),
};

export const saveVSRankCharacterAction = createAsyncThunk<
  CharacterIdListItem[],
  { data: SaveCharacterArgs; blob: Blob; image?: File }
>('vsRankCharacterPage/saveCharacter', async (payload) => {
  const { data, image, blob } = payload;
  const directory = `character-data/${data.uid}/${data.characterId}`;
  // ストレージアカウントにキャラクターデータを保存
  await uploadToStorageAccount(
    new File(
      [new Blob([JSON.stringify(data)], { type: 'application/json' })],
      'character-data.json',
      { type: 'application/json' },
    ),
    'character-data.json',
    directory,
  );
  // ストレージアカウントにキャラクターイラストを保存
  if (image) {
    await uploadToStorageAccount(image, 'character-image.png', directory);
  }
  // ストレージアカウントにユドナリウム用データを保存
  await uploadToStorageAccount(
    new File([blob], 'udonarium-character.zip', { type: 'application/zip' }),
    'udonarium-character.zip',
    directory,
  );
  // RDBに保存 / ローカルストレージにキャラクターIDと名前を保存
  const list = await saveCharacter({
    ...data,
    src: image
      ? getStorageAccountFilePath(
          `character-data/${data.uid}/${data.characterId}/character-image.png`,
        )
      : '',
  });

  // キャラクターIDと名前の一覧を返す
  return list;
});

const vsRankCharacterPageSlice = createSlice({
  name: 'vsRankCharacterPage',
  initialState,
  reducers: {
    setSheetInfo: (
      state,
      action: PayloadAction<
        Pick<VSRankCharacterPageState, 'spreadSheetId' | 'range' | 'sheetName'>
      >,
    ) => {
      state.spreadSheetId = action.payload.spreadSheetId;
      state.sheetName = action.payload.sheetName;
      state.range = action.payload.range;
    },
    setCardList: (state, action: PayloadAction<CharacterSheetPropsCard[]>) => {
      state.cardList = action.payload;
    },
    setCharacterName: (state, action: PayloadAction<string>) => {
      state.characterName = action.payload;
    },
    setCharacterSrc: (state, action: PayloadAction<string>) => {
      state.characterSrc = action.payload;
    },
    setCharacterId: (state, action: PayloadAction<string>) => {
      state.characterId = action.payload;
    },
    setCardTypeList: (state, action: PayloadAction<CardTypeWithLabel[]>) => {
      state.cardTypeList = action.payload;
    },
    setExtraTags: (state, action: PayloadAction<ExtraTag[]>) => {
      state.extraTags = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveVSRankCharacterAction.fulfilled, (state, action) => {
      state.characterList = action.payload;
    });
  },
  selectors: {
    spreadSheetCardListSelector: (state) => state.cardList,
    spreadSheetCardTypeListSelector: (state) => state.cardTypeList,
    characterNameSelector: (state) => state.characterName,
    characterSrcSelector: (state) => state.characterSrc,
    extraTagsSelector: (state) => state.extraTags,
    characterIdSelector: (state) => state.characterId,
    characterListSelector: (state) => state.characterList,
  },
});

export const {
  setSheetInfo,
  setCardList,
  setCharacterSrc,
  setCharacterName,
  setCardTypeList,
  setExtraTags,
  setCharacterId,
} = vsRankCharacterPageSlice.actions;
export const {
  spreadSheetCardListSelector,
  characterSrcSelector,
  characterNameSelector,
  spreadSheetCardTypeListSelector,
  extraTagsSelector,
  characterIdSelector,
  characterListSelector,
} = vsRankCharacterPageSlice.selectors;

export const selectedCards = createSelector(
  spreadSheetCardListSelector,
  (cardList) => cardList.filter((card) => card.count > 0),
);
export const characterParameters = createSelector(selectedCards, (cardList) =>
  cardsToParameters(cardList),
);

export const cardListWithTypeSelector = createSelector(
  spreadSheetCardListSelector,
  spreadSheetCardTypeListSelector,
  (cardList, typeList) => cardsToWithTypeList(cardList, typeList),
);

const stateSelector = (state: {
  vsRankCharacterPage: VSRankCharacterPageState;
}) => state.vsRankCharacterPage;

export const spreadSheetSelector = createSelector(
  stateSelector,
  ({ spreadSheetId, sheetName, range }) => ({
    spreadSheetId,
    sheetName,
    range,
  }),
);
export const cardTypeSpreadsheetSelector = createSelector(
  stateSelector,
  ({ spreadSheetId }) => ({
    spreadSheetId,
    sheetName: 'カード区分',
    range: 'A1:B30',
  }),
);
export const extraTagsSpreadsheetSelector = createSelector(
  stateSelector,
  ({ spreadSheetId }) => ({
    spreadSheetId,
    sheetName: 'Extraタグ',
    range: 'A3:E30',
  }),
);

export const selectedExtraTagsSelector = createSelector(
  extraTagsSelector,
  selectedCards,
  (extraTags, cards) => {
    return uniqExtraList(cards).flatMap((tag) => {
      const item = extraTags.find((t) => t.id === tag);
      if (!item) return [];
      return { ...item, icon: getStorageAccountFilePath(`/${item.icon}`) };
    });
  },
);

export const selectCharacterAction = createAsyncThunk<
  Promise<void>,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('vsRankCharacterPage/selectCharacter', async (id, thunk) => {
  const charaData = await getCharacter(id);
  const list = thunk.getState().vsRankCharacterPage.cardList.map((card) => ({
    ...card,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    count: charaData.cards.some((c: any) => c.name === card.name) ? 1 : 0,
  }));
  thunk.dispatch(setCardList(list));
  thunk.dispatch(setCharacterName(charaData.name));
  thunk.dispatch(setCharacterSrc(charaData.src));
  thunk.dispatch(setCharacterId(id));
});

export default vsRankCharacterPageSlice;
