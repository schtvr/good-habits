import AchievementTemplate from '../models/achievementTemplate';
import User from '../models/user';
import grantAchievement from './grantAchievement';
import { IUpdate } from '../interfaces/Update';


const checkAchievements = async (user: User, category: string, update: IUpdate) => {
  try {
    const templates = await AchievementTemplate.findAll({
      where: { category }
    });
    const completed = await getCount(user, category);
    for await (const template of templates) {
      if (completed == template.criteria) {
        try {
          await grantAchievement(template, user, update);
        } catch (err) {
          return;
        }
      }
    }
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
    return await user.countFriends();
  default:
    return 0;
  }
};

export default checkAchievements;
