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
import firebase from 'firebase-admin';
// Best practice: Get the credential file and db url from environment varible
const serviceAccount = require('../../good-habits-79e11-firebase-adminsdk-ivczh-43fd051544.json');
const dbUrl = 'https://good-habits-79e11-default-rtdb.firebaseio.com/'; 

const dbInit = async () => {
  try {
    firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
      databaseURL: dbUrl,
    });
  } catch (err) {
    console.log('Failed to start firebase lol: ', err);
  }
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
