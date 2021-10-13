import AchievementTemplate from '../models/achievementTemplate';
import User from '../models/user';
import grantAchievement from './grantAchievement';

const checkAchievements = async (user: User, category: string) => {
  try {
    const templates = await AchievementTemplate.findAll({
      where: { category }
    });
    const completed = await getCount(user, category);
    templates.forEach(async template => { 
      if (completed === template.criteria) {
        await grantAchievement(template, user);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const getCount = async (user: User, category: string) => {
  switch (category) {
  case 'Quests':
    return await user.countCompletedQuests();
  case 'Tasks':
    return await user.countTaskHistory();
  case 'Social':
    return await user.countUser();
  default:
    return 0;
  }
};

export default checkAchievements;
