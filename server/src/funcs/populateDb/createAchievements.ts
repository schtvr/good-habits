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
    name: 'Push it to the Limit',
    description: 'Complete five quests',
    img: '',
    criteria: 5,
    category: 'Quests',
    completionExp: 500 
  });
  await AchievementTemplate.create({
    name: 'Huge Questicles',
    description: 'Complete ten quests',
    img: '',
    criteria: 10,
    category: 'Quests',
    completionExp: 1000
  });
  await AchievementTemplate.create({
    name: 'Social Butterfly',
    description: 'Made a friend',
    img: '',
    criteria: 1,
    category: 'Social',
    completionExp: 100
  });
  await AchievementTemplate.create({
    name: 'Popular!',
    description: 'Made five friends',
    img: '',
    criteria: 5,
    category: 'Social',
    completionExp: 500
  });
  await AchievementTemplate.create({
    name: 'Task Noob',
    description: 'Complete your first task',
    img: '',
    criteria: 1,
    category: 'Tasks',
    completionExp: 100 
  });
  await AchievementTemplate.create({
    name: 'Task Starter',
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
    name: 'Task Master',
    description: 'Complete 25 tasks',
    img: '',
    criteria: 25,
    category: 'Tasks',
    completionExp: 500 
  });
};

export default createAchievements;