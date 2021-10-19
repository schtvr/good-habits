import {createSlice, createSelector} from '@reduxjs/toolkit';

const initialState = {
  myFriends: [],
  friendRequests: [],
};

export const friendSlice = createSlice({
  name: 'friend',
  initialState: {
    ...initialState,
  },
  reducers: {
    clearFriends: state => {
      state.myFriends = [];
      state.friendRequests = [];
    },
    getAllFriends: (state, body) => {
      console.log('GET ALL FRIENDS LOG', body.data.data);
      state.myFriends = body.data.data;
    },
    addFriend: (state, body) => {
      console.log('ADDED', body);
    },
    getFriendRequest: (state, body) => {
      state.friendRequests = body.data.data;
    },
    acceptFriendRequest: (state, body) => {
      console.log('MYFRIENDS', body.data.data);
      state.myFriends = [...state.myFriends, ...body.data.data.friend];
      state.friendRequests.shift();
    },
    rejectFriendRequest: (state, body) => {
      console.log('ACCEPT', body);
      // state.myFriends = body.data.data;
    },
  },
});

export const {
  getAllFriends,
  rejectFriendRequest,
  getFriendRequest,
  acceptFriendRequest,
  addFriend,
  clearFriends,
} = friendSlice.actions;
export const friendSelector = state => state.friendInfo;

export default friendSlice.reducer;
