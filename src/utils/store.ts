import { configureStore } from '@reduxjs/toolkit';
import app from '@modules/app/app.slice';
import user from '@modules/user/user.slice';
import document from '@modules/document/document.slice';
import config from '@utils/config';

const store = configureStore({
  reducer: {
    app,
    user,
    document,
    // add more store ...
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: config.ENV === 'dev',
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;
