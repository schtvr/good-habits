import User from '../models/user';
import Quest from '../models/quest';
import AchievementTemplate from '../models/achievementTemplate';
import bcrypt from 'bcrypt';

const populateDb = async () => {
  try {
    await createUsers();
    await createQuests();
    await createAchievements();

  } catch (err) {
    return;
  }
};


const createUsers = async () => {
  await User.create({
    userName: 'timbo',
    firstName: 'timbo',
    lastName: 'slice',
    email: 'bigBoy@gmail.com',
    password: bcrypt.hashSync('password123', 10)
  });
  await User.create({
    userName: 'dummy',
    firstName: 'victor',
    lastName: 'dumdum',
    email: 'dummy@dummy.com',
    password: bcrypt.hashSync('password123', 10)
  });
  await User.create({
    userName: 'dogShit',
    firstName: 'dogShit',
    lastName: 'tunic',
    email: 'stinkybum@garbage.com',
    password: bcrypt.hashSync('password123', 10)
  });
};

const createQuests = async () => {
  await Quest.create({
    name: 'Couch to 5k',
    duration: 30,
    description: 'Get off your fat ass and run 5 kilometeres',
    category: 'Health',
    completionExp: 1000,
    taskCount: 30
  });
  await Quest.create({
    name: 'Posture check!',
    duration: 14,
    description: 'Check ya posture, goon',
    category: 'Health',
    completionExp: 500,
    taskCount: 0
  });
  await Quest.create({
    name: 'Take your meds',
    duration: 7,
    description: 'Take your anti-psychotics',
    category: 'Health',
    completionExp: 300,
    taskCount: 7
  });
  const meditateQuest = await Quest.create({
    name: 'Mediation crash course',
    duration: 30,
    description: 'Mediate for a whole fkn month straight without stopping',
    category: 'Spiritual',
    completionExp: 1,
    taskCount: 5
  });

  await createMedidateTasks(meditateQuest);
};

const createMedidateTasks = async (quest: Quest) => {
  const tasks = [
    {
      name: 'Embark on your spiritual journey!',
      description: 'Time to start medidating! Take 15 minutes to sit alone and think about rivers',
      completionExp: 15,
      index: 1,
      day: 0
    },
    {
      name: 'Continue your Spiritual journey',
      description: 'Today, try and take 20 minutes of peaceful alone time and quietly contemplate the vast expanse of the universe.',
      completionExp: 20,
      index: 2,
      day: 3
    },
    {
      name: 'Halfway to enlightenment',
      description: 'Take 25 minutes, sit peacefully, and let your thoughts flow freely. Place no judgement on them, and accept them for what they are, simple thoughts (for you maybe mine are hella complex)',
      completionExp: 25,
      index: 3,
      day: 6
    },
    {
      name: 'Spiritual Guru',
      description: 'Today 30 minutes of meditation will leave you calmer than ever. Focus on the beauty of nature, specifically mountains. They are large and beautiful, don\'t you think?',
      completionExp: 30,
      index: 4,
      day: 9
    },
    {
      name: 'Nirvana Awaits',
      description: 'Today marks the final day on your meditation adventure. Take 30 minutes and reflect on how far you\'ve come, and the journeys that await you.',
      completionExp: 50,
      index: 5,
      day: 12
    }
  ];

  tasks.forEach(async task => {
    await quest.createTask(task);
  });

};

const createAchievements = async () => {
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
