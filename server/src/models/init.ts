import User from './user';
import Achievement from './achievement';
import AchievementTemplate from './achievementTemplate';
import ActiveQuest from './activeQuest';
import Quest from './quest';
import Task from './task';
import TaskHistory from './taskHistory';
import Blacklist from './blacklist';
import CompletedQuest from './completedQuest';
import RequestList from './requestList';
import FriendList from './friendList';
import FirebaseToken from './firebaseToken';

const dbInit = async () => {
  await User.sync();
  await Quest.sync();
  await AchievementTemplate.sync();
  await Achievement.sync();
  await ActiveQuest.sync();
  await Task.sync();
  await TaskHistory.sync();
  await Blacklist.sync();
  await CompletedQuest.sync();
  await RequestList.sync();
  await FriendList.sync();
  await FirebaseToken.sync();
};

export default dbInit;
