import {createSlice, createSelector} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IState {
  user: {
    userName: string;
    email: string;
    id: number;
    exp: number;
    level: number;
  };
  isAuthenticated: boolean;
}

const initialState: IState = {
  user: {
    userName: '',
    email: '',
    id: 0,
    exp: 0,
    level: 0,
  },
  isAuthenticated: false,
};
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    ...initialState,
  },
  reducers: {
    clearState: state => {
      console.log('clearState:');
      console.log('state', state);
      state.user = initialState.user;
      state.isAuthenticated = false;
    },
    signOut: (state, body) => {
      state.user = initialState.user;
      console.log('BOODDY', body);
      const removeToken = async () => {
        state.isAuthenticated = false;
        await AsyncStorage.removeItem('token', body.data.token);
      };
      removeToken();
    },
    signIn: (state, body) => {
      state.user = {
        ...body.data.user,
      };
      const setToken = async () => {
        await AsyncStorage.setItem('token', body.data.token);
      };
      setToken();
      state.isAuthenticated = true;
    },
  },
});

export const {signIn, signOut, clearState} = userSlice.actions;
export const authSelector = state => state.authInfo.isAuthenticated;
export const userSelector = state => state.authInfo.user;
export const stateSelector = state => state.authInfo;
export default userSlice.reducer;
