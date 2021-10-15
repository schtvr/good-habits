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
  error: string;
  usersList: any[];
  globalRankings: [];
  friendRankings: [];
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
  error: '',
  usersList: [],
  globalRankings: [],
  friendRankings: [],
};

const setToken = async token => {
  await AsyncStorage.setItem('token', token);
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
    register: (state, body) => {
      console.log('user/register', body);
      state.user = {
        ...body.data.user,
      };
      setToken(body.data.token);
      state.isAuthenticated = true;
    },
    signIn: (state, body) => {
      console.log('user/login', body);
      setToken(body.data.data);
      state.isAuthenticated = true;
    },
    getUsers: (state, body) => {
      state.usersList = body.data.data;
    },
    error: (state, body) => {
      console.log('user-error', body);
      if (body.data) state.error = body.data.message;
      else state.error = 'server error';
    },
    getUser: (state, body) => {
      console.log('KAKAKAKAKAK', body.data.data)
      state.user = body.data.data;
    },
    getAllRanking: (state, body) => {
      console.log('BODY IN', body);
      state.globalRankings = body.data.data;
    },
    getFriendRanking: (state, body) => {
      state.friendRankings = body.data.data;
    },
  },
});

export const {
  register,
  signIn,
  signOut,
  clearState,
  getUsers,
  getUser,
  getAllRanking,
  getFriendRanking,
} = userSlice.actions;
export const authSelector = state => state.authInfo.isAuthenticated;
export const userSelector = state => state.authInfo.user;
export const stateSelector = state => state.authInfo;
export default userSlice.reducer;
