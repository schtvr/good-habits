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
      state.myFriends = body.data.data;
    },
    addFriend: (state, body) => {
      console.log('ADDED', body);
    },
    getFriendRequest: (state, body) => {
      console.log('RECIEVED', body);
      if (body.data.data[0]) {
        state.friendRequests.push(
          body.data.data[0].friendRequests,
          body.data.data[0].userName,
        );
      }
    },
    acceptFriendRequest: (state, body) => {
      console.log('ACCEPT', body);
      state.myFriends.push(body.data.data);
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
