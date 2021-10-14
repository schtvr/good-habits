import {createSlice, createSelector} from '@reduxjs/toolkit';

const initialState = {
  achievements: [],
};

export const achievementSlice = createSlice({
  name: 'achievements',
  initialState: {
    ...initialState,
  },
  reducers: {
    clearState: state => {
      state = initialState;
    },
    getAllAchievements: (state, body) => {
      console.log('BODY OF SLICE', body);
      state.achievements = body.data.data;
    },
  },
});

export const {getAllAchievements, clearState} = achievementSlice.actions;
export const achievementSelector = state => state.achievementInfo;

export default achievementSlice.reducer;
