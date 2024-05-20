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

import {
  CharacterIdListItem,
  CharacterSheetPropsCard,
  ExtraTag,
} from '@yakumi-app/domain/vsRankCharacter/types';
import { AppDispatch, RootState } from '@yakumi-app/store';
import { setCharacterId } from '@yakumi-app/store/slices/vsRankCharacterPageSlice';
import { storageAccountPrefix } from '../../constants';
import {
  SaveFallMagiaCharacterArgs,
  saveCharacter,
} from '../../services/persistent/saveCharacter';
import fallMagiaCharacterSlice, {
  characterCardIdsSelector,
  characterFactionSelector,
  setCharacterName,
} from './fallMagiaCharacterSlice';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CardTypeWithLabel {
  type: string;
  label: string;
}
interface FallMagiaCharacterPageState {
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

const initialState: FallMagiaCharacterPageState = {
  characterSrc: getImageSrc(
    'assets/images/udonarium/outline_person_outline_black_24dp.png',
  ),
  spreadSheetId:
    searchParams.get('id') || '1lRoDfjaU3MZW7z0KYrAxIHwIren-QNQU9w36_l6WgNI',
  sheetName: searchParams.get('sheet') || 'カード一覧',
  range: 'A4:R100',
  cardList: [],
  cardTypeList: [],
  extraTags: [],
  characterList: [],
};

export const saveFallMagiaCharacterAction = createAsyncThunk<
  Promise<void>,
  { data: SaveFallMagiaCharacterArgs; blob: Blob; image?: File },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>('fallMagiaCharacterPage/saveCharacter', async (payload, thunk) => {
  const { data, image, blob } = payload;
  const directory = `${storageAccountPrefix}/${data.uid}/${data.characterId}`;

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
  const src = (() => {
    if (image)
      return getStorageAccountFilePath(
        `${storageAccountPrefix}/${data.uid}/${data.characterId}/character-image.png`,
      );
    const characterSrc = thunk.getState().fallMagiaCharacterPage.characterSrc;
    if (characterSrc) return characterSrc;

    return '';
  })();
  const saveCharacterData = {
    ...data,
    src,
  };
  // ストレージアカウントにキャラクターデータを保存
  await uploadToStorageAccount(
    new File(
      [
        new Blob([JSON.stringify(saveCharacterData)], {
          type: 'application/json',
        }),
      ],
      'character-data.json',
      { type: 'application/json' },
    ),
    'character-data.json',
    directory,
  );
  // RDBに保存 / ローカルストレージにキャラクターを保存
  await saveCharacter(saveCharacterData);
  if (image) {
    thunk.dispatch(
      fallMagiaCharacterSlice.actions.setSrc(saveCharacterData.src),
    );
  }
});

const fallMagiaCharacterPageSlice = createSlice({
  name: 'fallMagiaCharacterPage',
  initialState,
  reducers: {
    setSheetInfo: (
      state,
      action: PayloadAction<
        Pick<
          FallMagiaCharacterPageState,
          'spreadSheetId' | 'range' | 'sheetName'
        >
      >,
    ) => {
      state.spreadSheetId = action.payload.spreadSheetId;
      state.sheetName = action.payload.sheetName;
      state.range = action.payload.range;
    },
    setCardList: (state, action: PayloadAction<CharacterSheetPropsCard[]>) => {
      state.cardList = action.payload;
    },
    setCharacterSrc: (state, action: PayloadAction<string>) => {
      state.characterSrc = action.payload;
    },
    setCardTypeList: (state, action: PayloadAction<CardTypeWithLabel[]>) => {
      state.cardTypeList = action.payload;
    },
    setExtraTags: (state, action: PayloadAction<ExtraTag[]>) => {
      state.extraTags = action.payload;
    },
  },
  selectors: {
    spreadSheetCardListSelector: (state) => state.cardList,
    spreadSheetCardTypeListSelector: (state) => state.cardTypeList,
    characterSrcSelector: (state) => state.characterSrc,
    extraTagsSelector: (state) => state.extraTags,
    characterListSelector: (state) => state.characterList,
  },
});

export const {
  setSheetInfo,
  setCardList,
  setCharacterSrc,
  setCardTypeList,
  setExtraTags,
} = fallMagiaCharacterPageSlice.actions;
export const {
  spreadSheetCardTypeListSelector,
  characterSrcSelector,
  extraTagsSelector,
  characterListSelector,
} = fallMagiaCharacterPageSlice.selectors;
export const spreadSheetCardListSelector = createSelector(
  fallMagiaCharacterPageSlice.selectors.spreadSheetCardListSelector,
  characterCardIdsSelector,
  characterFactionSelector,
  (cardList, cards, faction) =>
    cardList
      .filter((card) => ['A', 'B', 'C', faction?.type].includes(card.type))
      .map((card, index) => ({
        ...card,
        count: cards.includes(card.id) ? 1 : 0,
        index,
      })),
);
export const selectedCards = createSelector(
  fallMagiaCharacterPageSlice.selectors.spreadSheetCardListSelector,
  characterCardIdsSelector,
  (cardList, cards) => cardList.filter((card) => cards.includes(card.id)),
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
  fallMagiaCharacterPage: FallMagiaCharacterPageState;
}) => state.fallMagiaCharacterPage;

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
>('fallMagiaCharacterPage/selectCharacter', async (id, thunk) => {
  const charaData = await getCharacter(id);
  const list = thunk.getState().fallMagiaCharacterPage.cardList.map((card) => ({
    ...card,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    count: charaData.cards.some((c: any) => c.name === card.name) ? 1 : 0,
  }));
  thunk.dispatch(setCardList(list));
  thunk.dispatch(setCharacterName(charaData.name));
  thunk.dispatch(setCharacterSrc(charaData.src));
  thunk.dispatch(setCharacterId(id));
});

export default fallMagiaCharacterPageSlice;
