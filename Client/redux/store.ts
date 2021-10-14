import {configureStore} from '@reduxjs/toolkit';
import {userSlice} from './userSlice';
import {questSlice} from './questSlice';
import {setupListeners} from '@reduxjs/toolkit/query';
import apiService from './apiService';
import {achievementSlice} from './achievementSlice';
import {friendSlice} from './friendSlice';

export const store = configureStore({
  reducer: {
    authInfo: userSlice.reducer,
    questInfo: questSlice.reducer,
    achievementInfo: achievementSlice.reducer,
    friendInfo: friendSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiService),
  // preloadedState,
});

setupListeners(store.dispatch);
