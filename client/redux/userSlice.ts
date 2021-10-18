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
    pfp: string;
  };
  otherUser: {
    userName: string;
    id: number;
    exp: number;
    level: number;
  };
  isAuthenticated: boolean;
  error: string;
  usersList: any[];
  loading: boolean;
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
    firebaseId: '',
    pfp: 'https://i.imgur.com/1dhHIkV.png',
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
  loading: false,
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
    clearError: state => {
      state.error = '';
    },
    signOut: (state, body) => {
      state.user = initialState.user;
      const removeToken = async () => {
        state.isAuthenticated = false;
        await AsyncStorage.removeItem('token');
      };
      removeToken();
    },
    register: (state, body) => {
      state.loading = true;
      state.user = {
        ...body.data.user,
      };
      setToken(body.data.token);
      state.isAuthenticated = true;
      state.loading = false;
      state.error = '';
    },
    signIn: (state, body) => {
      state.loading = true;
      console.log(state);
      setToken(body.data.data);
      state.isAuthenticated = true;
      state.loading = false;
      state.error = '';
    },
    getUsers: (state, body) => {
      state.loading = true;
      state.usersList = body.data.data;
      state.loading = false;
    },
    error: (state, body) => {
      console.log('user-error', body.data);
      state.error = body.data.message;
    },
    getUser: (state, body) => {
      state.loading = true;
      state.user = body.data.data;
      state.loading = false;
    },
    updateExp: (state, body) => {
      state.user.exp += body.update.gainedExp;
    },
    getAllRanking: (state, body) => {
      state.loading = true;
      state.globalRankings = body.data.data;
      state.loading = false;
    },
    getFriendRanking: (state, body) => {
      state.loading = true;
      state.friendRankings = body.data.data;
      state.loading = false;
    },
    getOtherUser: (state, body) => {
      state.loading = true;
      state.otherUser = body.data.data;
      state.loading = false;
    },
    setPfp: (state, body) => {
      state.user.pfp = body.data.data.pfp;
    },
  },
});

export const {
  clearError,
  register,
  signIn,
  signOut,
  getOtherUser,
  getUsers,
  getUser,
  getAllRanking,
  getFriendRanking,
  setPfp,
} = userSlice.actions;
export const authSelector = state => state.authInfo.isAuthenticated;
export const userSelector = state => state.authInfo.user;
export const stateSelector = state => state.authInfo;
export default userSlice.reducer;
