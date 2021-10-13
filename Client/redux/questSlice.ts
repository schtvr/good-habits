import {createSlice, createSelector} from '@reduxjs/toolkit';

const initialState = {
  id: 0,
  duration: 0,
  name: '',
  description: '',
  category: '',
  completionExp: 0,
  quests: [],
};

export const questSlice = createSlice({
  name: 'quest',
  initialState: {
    ...initialState,
  },
  reducers: {
    clearState: state => {
      state = initialState;
    },
    getAllQuests: (state, body) => {
      state.quests = body.data.data;
    },
  },
});

export const {getAllQuests, clearState} = questSlice.actions;
export const questSelector = state => state.questInfo;

export default questSlice.reducer;
