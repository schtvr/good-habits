import AchievementTemplate from '../models/achievementTemplate';
import User from '../models/user';

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

export default grantAchievement;