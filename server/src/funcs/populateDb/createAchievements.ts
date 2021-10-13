import AchievementTemplate from '../../models/achievementTemplate';

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
    name: 'Task starter',
    description: 'Complete five tasks',
    img: '',
    criteria: 5,
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
    completionExp: 500 
  });
};

export default createAchievements;