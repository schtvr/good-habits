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
    clearState: state => {
      state = initialState;
    },
    getAllFriends: (state, body) => {
      state.myFriends = body.data.data;
    },
    addFriend: (state, body) => {
      console.log(body);
      // state.myFriends = body.data.data;
    },
    getFriendRequest: (state, body) => {
      console.log('RQUEST', body.data.data[0].friendRequests);
      state.friendRequests = body.data.data;
    },
  },
});
{
  /* <BadgedIcon
          style={styles.icons}
          type="material"
          name="notifications-none"
          size={30}
        /> */
}

export const {getAllFriends, getFriendRequest, addFriend} = friendSlice.actions;
export const friendSelector = state => state.friendInfo;

export default friendSlice.reducer;
