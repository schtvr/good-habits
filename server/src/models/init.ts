import User from './user';
import UserAchievements from './userAchievements';

const dbInit = () => {
  User.sync();
  UserAchievements.sync();
};

export default dbInit;