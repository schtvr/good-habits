import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './userSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import apiService from './apiService'


export const store = configureStore({
  reducer: {
    authInfo: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService),
  // preloadedState,
});

setupListeners(store.dispatch)