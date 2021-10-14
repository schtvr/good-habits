import {createSlice, createSelector} from '@reduxjs/toolkit';

const initialState = {
  quests: [],
  myQuests: [],
  tasks: [],
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
      console.log('BODY', body);
      state.quests = body.data.data;
    },
    getAllTasks: (state, body) => {
      console.log('tasks///////////', body);
      state.tasks = body.data.data;
    },
    addQuest: (state, body) => {
      //   console.log('ADDQUEST---', body);
      state.myQuests = body.data.data;
    },
  },
});

export const {getAllQuests, clearState, getAllTasks, addQuest} =
  questSlice.actions;
export const questSelector = state => state.questInfo;

export default questSlice.reducer;
