import User from './user';
import Achievement from './achievement';
import AchievementTemplate from './achievementTemplate';
import ActiveQuest from './activeQuest';
import Quest from './quest';

const dbInit = async () => {
  await User.sync();
  await AchievementTemplate.sync();
  await Achievement.sync();
  await ActiveQuest.sync();
  await Quest.sync();
};

export default dbInit;
