import User from '../models/user';
import Quest from '../models/quest';
import AchievementTemplate from '../models/achievementTemplate';

const populateDb = async () => {
  // DUMMY USERS
  await User.create({
    userName: 'timbo',
    firstName: 'timbo',
    lastName: 'slice',
    email: 'bigBoy@gmail.com',
    password: 'password123'
  });
  await User.create({
    userName: 'dummy',
    firstName: 'victor',
    lastName: 'dumdum',
    email: 'dummy@dummy.com',
    password: 'password123'
  });
  await User.create({
    userName: 'dogShit',
    firstName: 'dogShit',
    lastName: 'tunic',
    email: 'stinkybum@garbage.com',
    password: 'password123'
  });
  
  // DUMMY QUESTS
  await Quest.create({
    name: 'Couch to 5k',
    duration: 30,
    description: 'Get off your fat ass and run 5 kilometeres',
    category: 'health',
    completionExp: 10000
  });
  await Quest.create({
    name: 'Posture check!',
    duration: 14,
    description: 'Check ya posture, goon',
    category: 'health',
    completionExp: 5000
  });
  await Quest.create({
    name: 'Take your meds',
    duration: 7,
    description: 'Take your anti-psychotics',
    category: 'health',
    completionExp: 300
  });
  await Quest.create({
    name: 'Mediation crash course',
    duration: 30,
    description: 'Mediate for a whole fkn month straight without stopping',
    category: 'Spirtual',
    completionExp: 1
  });
  
  // DUMMY ACHIEVEMENTS
  await AchievementTemplate.create({
    name: 'Adventurer',
    description: 'Complete your first quest',
    img: '',
    criteria: 1,
    category: 'Quests',
    completionExp: 100
  });
  await AchievementTemplate.create({
    name: 'Push it the limit',
    description: 'Complete five quests',
    img: '',
    criteria: 5,
    category: 'Quests',
    completionExp: 500 
  });
  await AchievementTemplate.create({
    name: 'Huge questicles',
    description: 'Complete ten quests',
    img: '',
    criteria: 10,
    category: 'Quests',
    completionExp: 1000
  });
  await AchievementTemplate.create({
    name: 'Social butterfly',
    description: 'Made a friend',
    img: '',
    criteria: 1,
    category: 'Social',
    completionExp: 100
  });
  await AchievementTemplate.create({
    name: 'Town bike',
    description: 'Made five friends',
    img: '',
    criteria: 5,
    category: 'Social',
    completionExp: 500
  });
  await AchievementTemplate.create({
    name: 'Task noob',
    description: 'Complete your first task',
    img: '',
    criteria: 1,
    category: 'Tasks',
    completionExp: 100 
  });
  await AchievementTemplate.create({
    name: 'Grinder',
    description: 'Complete 10 tasks',
    img: '',
    criteria: 10,
    category: 'Tasks',
    completionExp: 300
  });
  await AchievementTemplate.create({
    name: 'Task master',
    description: 'Complete 25 tasks',
    img: '',
    criteria: 25,
    category: 'Tasks',
    completionExp: 2500 
  });
};

export default populateDb;