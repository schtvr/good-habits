import { createSlice, createSelector } from '@reduxjs/toolkit';
import { InteractionManagerStatic } from 'react-native';

interface IState {
  user: {
    userName: string,
    email: string,
    id: number,
    exp: number,
    level: number
  },
  isAuthenticated: boolean
}

const initialState: IState = {
  user: {
    userName: '',
    email: '',
    id: 0,
    exp: 0,
    level: 0,
  },
  isAuthenticated: false
};
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      userName: '',
      email: '',
      id: 0,
      exp: 0,
      level: 0,
    },
    isAuthenticated: false
  },
  reducers: {
    clearState: (state) => {
      console.log('clearState:');
      console.log('state', state);
      state.user = initialState.user;
      state.isAuthenticated = false;
    },
    signOut: (state) => { 
      state.user = initialState.user;
      state.isAuthenticated = false;
    },
    signIn: (state, body) => {
      console.log('userSlice:');
      console.log('state', state);
      console.log('body', body);
      state.user = {
        ...body.payload.user
      };
      state.isAuthenticated = true;
    }
  }
});

export const { signIn, signOut, clearState } = userSlice.actions;
export const authSelector = (state) => state.authInfo.isAuthenticated;
export const userSelector = (state) => state.authInfo.user;
export const stateSelector = (state) => state.authInfo;
export default userSlice.reducer;