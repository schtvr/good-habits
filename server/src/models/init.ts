import User from './user';
import Achievement from './achievement';
import AchievementTemplate from './achievementTemplate';
import ActiveQuest from './activeQuest';
import Quest from './quest';
import Task from './task';
import TaskHistory from './taskHistory';

const dbInit = async () => {
  await User.sync();
  await Quest.sync();
  await AchievementTemplate.sync();
  await Achievement.sync();
  await ActiveQuest.sync();
  await Task.sync();
  await TaskHistory.sync();
};

export default dbInit;
