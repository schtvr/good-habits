import { IUpdate } from '../interfaces/Update';
import AchievementTemplate from '../models/achievementTemplate';
import User from '../models/user';


const grantAchievement = async (achieve: AchievementTemplate, user: User, update: IUpdate) => {
  try {
    await user.createAchievement({
      templateId: achieve.id
    });
    await user.update({
      exp: user.exp += achieve.completionExp
    });
    update.achievements.push(achieve);
    update.gainedExp += achieve.completionExp;
  } catch (err) {
    console.log(err);
  }
};

export default grantAchievement;