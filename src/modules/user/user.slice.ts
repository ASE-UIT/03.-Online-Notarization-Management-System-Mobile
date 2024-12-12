import { Dispatch, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IToken, IUser, IUserState } from './user.typeDefs';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@utils/store';

const initialState: IUserState = {
  checked: false,
  loggedIn: false,
  user: undefined,
  accessToken: undefined,
  refreshToken: undefined,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedIn: (state: IUserState, { payload }: PayloadAction<boolean>) => {
      state.checked = true;
      state.loggedIn = payload;
    },
    setUser: (state: IUserState, { payload }: PayloadAction<IUser | undefined>) => {
      state.user = payload;
    },
    reset: () => initialState,
  },
});

export function useUserSlice() {
  const dispatch = useDispatch<Dispatch>();
  const state = useSelector(({ user }: State) => user);
  return { dispatch, ...state, ...slice.actions };
}

export default slice.reducer;
