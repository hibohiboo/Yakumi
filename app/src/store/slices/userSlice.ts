import { createSlice } from '@reduxjs/toolkit';
import { getOrCreateUserId } from '@yakumi-app/domain/vsRankCharacter/persistent/userId';

interface UserState {
  uid: string;
}

const initialState: UserState = {
  uid: getOrCreateUserId(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    uidSelector: (state) => state.uid,
  },
});

export const { uidSelector: uidSelector } = userSlice.selectors;

export default userSlice;
