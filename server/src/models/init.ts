import User from './user';
import Achievement from './achievement';
import AchievementTemplate from './achievementTemplate';

const dbInit = async () => {
  await User.sync();
  await AchievementTemplate.sync();
  await Achievement.sync();
};


export default dbInit;