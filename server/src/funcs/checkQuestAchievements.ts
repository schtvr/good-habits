import AchievementTemplate from '../models/achievementTemplate';
import User from '../models/user';

const checkQuestAchievements = async (user: User) => {
  const templates = await AchievementTemplate.findAll({
    where: {
      category: 'Quests'
    }
  });
  const completedQuests = await user.countCompletedQuests();
  templates.forEach(async template => {
    if (completedQuests === template.criteria) {
      await grantAchievement(template, user);
    }
  });
};

const grantAchievement = async (achieve: AchievementTemplate, user: User) => {
  await achieve.createAchievement({
    userId: user.id
  });
  user.exp += achieve.completionExp;
  await User.update(
    { exp: user.exp },
    { where: {
      id: user.id
    }}
  );
};

export default checkQuestAchievements;
