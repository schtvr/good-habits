import {createSlice, createSelector} from '@reduxjs/toolkit';

const initialState = {
  achievements: [],
  userAchievements: [],
  completedTasks: [],
};

export const achievementSlice = createSlice({
  name: 'achievements',
  initialState: {
    ...initialState,
  },
  reducers: {
    clearAchievements: state => {
      state = { 
        ...initialState 
      };
    },
    getAllAchievements: (state, body) => {
      state.achievements = body.data.data;
    },
    sortCompletedTask: (state, body) =>{
      state.userAchievements = [...state.userAchievements, ...body.data.data.achievements];
      state.completedTasks = [...state.completedTasks, ...body.data.data.tasks];
    },
    getTaskHistory: (state, body) => {
      console.log(body);
      state.completedTasks = [...state.completedTasks, ...body.data.data]
    }
  },
});

export const {getAllAchievements, clearAchievements, sortCompletedTask, getTaskHistory} = achievementSlice.actions;
export const achievementSelector = state => state.achievementInfo;

export default achievementSlice.reducer;
