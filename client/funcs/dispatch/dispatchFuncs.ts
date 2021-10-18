import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getFriendRequest,
  getAllFriends,
  clearFriends,
} from '../../redux/friendSlice';
import {getUser, signOut} from '../../redux/userSlice';
import {
  getActiveTasks,
  getActiveQuests,
  clearQuests,
} from '../../redux/questSlice';
import {
  getTaskHistory,
  clearAchievements,
  getAllAchievements,
  getOwnedAchievements,
} from '../../redux/achievementSlice';

export const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

export const getMyFriendRequests = async (dispatch: Function) => {
  dispatch(
    getFriendRequest({
      api: {
        url: 'user/friendRequestReceived',
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      },
    }),
  );
};

export const getUserById = async (dispatch: Function) => {
  dispatch(
    getUser({
      api: {
        url: 'user',
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      },
    }),
  );
};

export const getDailyTasks = async (dispatch: Function) => {
  dispatch(
    getActiveTasks({
      api: {
        url: 'tasks/daily',
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      },
    }),
  );
};

export const getUsersActiveQuests = async (dispatch: Function) => {
  dispatch(
    getActiveQuests({
      api: {
        url: 'quest/getActiveQuests',
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      },
    }),
  );
};

export const getUsersFriends = async (dispatch: Function) => {
  dispatch(
    getAllFriends({
      api: {
        url: 'user/friends',
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      },
    }),
  );
};

export const getUserTaskHistory = async (dispatch: Function) => {
  dispatch(
    getTaskHistory({
      api: {
        url: 'task',
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      },
    }),
  );
};

export const userLogOut = async (dispatch: Function) => {
  dispatch(clearAchievements());
  dispatch(clearQuests());
  dispatch(clearFriends());
  dispatch(
    signOut({
      api: {
        method: 'POST',
        url: 'logout',
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      },
    }),
  );
};

export const getTemplateAchievements = async (dispatch: Function) => {
  dispatch(
    getAllAchievements({
      api: {
        url: 'achievement/templates',
      },
    }),
  );
};

export const getUserAchievements = async (dispatch: Function) => {
  dispatch(
    getOwnedAchievements({
      api: {
        url: 'achievement',
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      },
    }),
  );
};
