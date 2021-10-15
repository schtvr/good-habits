import {createSlice, createSelector} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IState {
  user: {
    userName: string;
    email: string;
    id: number;
    exp: number;
    level: number;
    firebaseId: string;
  };
  otherUser: {
    userName: string;
    id: number;
    exp: number;
    level: number;
  }
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
    firebaseId: ''
  },
  otherUser: {
    userName: '',
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
      state.user = initialState.user;
      state.isAuthenticated = false;
    },
    signOut: (state, body) => {
      state.user = initialState.user;
      const removeToken = async () => {
        state.isAuthenticated = false;
        await AsyncStorage.removeItem('token', body.data.token);
      };
      removeToken();
    },
    register: (state, body) => {
      state.user = {
        ...body.data.user,
      };
      setToken(body.data.token);
      state.isAuthenticated = true;
    },
    signIn: (state, body) => {
      setToken(body.data.data);
      state.isAuthenticated = true;
    },
    getUsers: (state, body) => {
      state.usersList = body.data.data;
    },
    error: (state, body) => {
      console.log('user-error', body.data);
      if (body.data) state.error = body.data.message;
      else state.error = 'server error';
    },
    getUser: (state, body) => {
      state.user = body.data.data;
    },
    getAllRanking: (state, body) => {
      state.globalRankings = body.data.data;
    },
    getFriendRanking: (state, body) => {
      state.friendRankings = body.data.data;
    },
    getOtherUser: (state, body) => {
      state.otherUser = body.data.data;
    },
  },
});

export const {
  register,
  signIn,
  signOut,
  clearState,
  getOtherUser,
  getUsers,
  getUser,
  getAllRanking,
  getFriendRanking,
} = userSlice.actions;
export const authSelector = state => state.authInfo.isAuthenticated;
export const userSelector = state => state.authInfo.user;
export const stateSelector = state => state.authInfo;
export default userSlice.reducer;
