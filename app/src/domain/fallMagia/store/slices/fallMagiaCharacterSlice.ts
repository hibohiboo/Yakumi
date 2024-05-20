import { createSelector, createSlice } from '@reduxjs/toolkit';
import { CharacterSheetPropsCard } from '@yakumi-components/components/vsRankedMatch/CharacterPreviwer/types';
import { readCharacterData } from '../../services/characterCreateService';
import { setCharacter } from '../../services/persistent/saveCharacter';
import { scene4SelectItems } from '../../services/scene4Items';
import type { PayloadAction } from '@reduxjs/toolkit';

interface FallMagiaCharacterState {
  characterId: string;
  characterName: string;
  faction: string; // 魔法少女の所属派閥
  cards: CharacterSheetPropsCard[];
  memo: string;
  src?: string; // 画像のURL
}

const character = readCharacterData();

const initialState: FallMagiaCharacterState = {
  characterId: character.characterId,
  characterName: character.name,
  faction: character.faction,
  cards: character.cards,
  memo: character.memo,
  src: character.src,
};

const fallMagiaCharacterSlice = createSlice({
  name: 'fallMagiaCharacterSlice',
  initialState,
  reducers: {
    setCharacterName: (state, action: PayloadAction<string>) => {
      state.characterName = action.payload;
      setCharacter({ ...readCharacterData(), name: action.payload });
    },
    setMemo: (state, action: PayloadAction<string>) => {
      state.memo = action.payload;
      setCharacter({ ...readCharacterData(), memo: action.payload });
    },
    setFaction: (state, action: PayloadAction<string>) => {
      state.faction = action.payload;
      setCharacter({ ...readCharacterData(), faction: action.payload });
    },
    setSrc: (state, action: PayloadAction<string>) => {
      state.src = action.payload;
      setCharacter({ ...readCharacterData(), src: action.payload });
    },
    addCard: (state, action: PayloadAction<CharacterSheetPropsCard>) => {
      state.cards.push(action.payload);
      setCharacter({ ...readCharacterData(), cards: state.cards });
    },
    removeCard: (state, action: PayloadAction<CharacterSheetPropsCard>) => {
      state.cards = state.cards.filter((c) => c.id !== action.payload.id);
      setCharacter({ ...readCharacterData(), cards: state.cards });
    },
  },
  selectors: {
    characterNameSelector: (state) => state.characterName,
    characterIdSelector: (state) => state.characterId,
    characterFactionSelector: (state) =>
      scene4SelectItems.find((item) => item.tag === state.faction),
    characterMemoSelector: (state) => state.memo,
    characterSavedSrcSelector: (state) => state.src,
  },
});
const stateSelector = (state: {
  fallMagiaCharacterSlice: FallMagiaCharacterState;
}) => state.fallMagiaCharacterSlice;
export const characterCardIdsSelector = createSelector(stateSelector, (state) =>
  state.cards.map((card) => card.id),
);
export const { setCharacterName, setMemo, setFaction, addCard, removeCard } =
  fallMagiaCharacterSlice.actions;
export const {
  characterNameSelector,
  characterIdSelector,
  characterFactionSelector,
  characterMemoSelector,
  characterSavedSrcSelector,
} = fallMagiaCharacterSlice.selectors;
export default fallMagiaCharacterSlice;
