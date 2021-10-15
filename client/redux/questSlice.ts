import {createSlice, createSelector} from '@reduxjs/toolkit';

const initialState = {
  quests: [],
  myQuests: [],
  tasks: [],
  activeQuests: [],
  completedQuests: [],
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
    getAllTasks: (state, body) => {
      state.tasks = body.data.data;
    },
    addQuest: (state, body) => {
      state.myQuests = body.data.data;
      console.log('ADD', body.data.data);
    },
    getActiveQuests: (state, body) => {
      state.activeQuests = body.data.data;
      console.log('ACTIVE', body.data.data);
      console.log('ACTIVEQUESTS', state.activeQuests);
    },
    getCompletedQuests: (state, body) => {
      state.completedQuests = body.data.data;
    },
  },
});

export const {
  getAllQuests,
  getActiveQuests,
  clearState,
  getAllTasks,
  addQuest,
  getCompletedQuests,
} = questSlice.actions;
export const questSelector = state => state.questInfo;

export default questSlice.reducer;
