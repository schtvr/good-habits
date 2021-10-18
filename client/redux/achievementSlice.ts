import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  achievements: [],
  userAchievements: [],
  newAchievements: [],
  completedTasks: [],
  update: {},
};

export const achievementSlice = createSlice({
  name: 'achievements',
  initialState: {
    ...initialState,
  },
  reducers: {
    clearAchievements: state => {
      state.achievements = [];
      state.userAchievements = [];
      state.completedTasks = [];
    },
    clearNewAchievements: state => {
      state.newAchievements = [];
    },
    getAllAchievements: (state, body) => {
      state.achievements = body.data.data;
    },
    getOwnedAchievements: (state, body) => {
      state.userAchievements = body.data.data;
    },
    getNewAchievements: (state, body) => {
      state.newAchievements = body.update.achievements;
    },
    sortCompletedTask: (state, body) => {
      state.userAchievements = [
        ...state.userAchievements,
        ...body.update.achievements,
      ];
      state.completedTasks = [...state.completedTasks, ...body.update.tasks];
    },
    sendTaskComplete: (state, body) => {},
    getTaskHistory: (state, body) => {
      state.completedTasks = [...state.completedTasks, ...body.data.data];
    },
  },
});

export const {
  getAllAchievements,
  clearAchievements,
  sortCompletedTask,
  getTaskHistory,
  sendTaskComplete,
  getOwnedAchievements,
  getNewAchievements,
  clearNewAchievements,
} = achievementSlice.actions;
export const achievementSelector = state => state.achievementInfo;

export default achievementSlice.reducer;
