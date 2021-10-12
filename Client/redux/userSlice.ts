import { createSlice, createSelector } from '@reduxjs/toolkit';

interface IState {
  user: {
    userName: string,
    email: string,
  },
  isAuthenticated: boolean
}

const initialState: IState = {
  user: {
    userName: '',
    email: '',
  },
  isAuthenticated: false
};
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      userName: '',
      email: '',
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
      // const { payload } = body;
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
// export const authSelector = (state) => state.authInfo.isAuthenticated;
// export const userSelector = (state) => state.authInfo.user;
export default userSlice.reducer;