import { Request, Response } from 'express';
import User from '../models/user';
import AchievementTemplate from '../models/achievementTemplate';
import Achievement from '../models/achievement';
import sendRes from '../funcs/sendRes';


const getUserAchievements = async (req: Request, res: Response) => {
  const { user } = req;
  if (!user) return sendRes(res, false, 400, 'Not authenticated');
  try {
    const achievements = await user.getAchievements();
    return sendRes(res, true, 200, 'Achievements retrieved', achievements);
  } catch (err) {
    sendRes(res, false, 500, 'Error retrieving achievements', err);
  }
};

const getAllAchievements = async (req: Request, res: Response) => {
  try {
    const allAchievements = await AchievementTemplate.findAll();
    return sendRes(res, true, 200, 'Achievement templates retreieved', allAchievements);
  } catch (err) {
    return sendRes(res, false, 500, 'Error retrieving achievements', err);
  }
};

const grantAchievement = async (req: Request, res: Response) => {
  const { user } = req;
  const achievementId: string = req.params.id;
  if (!user) return sendRes(res, false, 400, 'Not authenticated'); 
  if (achievementId === undefined) return sendRes(res, false, 422, 'Missing form information');

  try {
    const hasAchieve = await Achievement.findOne({
      where: {
        userId: user.id,
        templateId: achievementId
      }
    });
    
    if (hasAchieve) return res.status(403).send({
      status: 'Bad',
      message: 'User already has this achievement'
    });

    const achieve = await AchievementTemplate.findOne({
      where: {
        id: achievementId
      }
    });
    if (!achieve) return res.status(422).send({ 
      status: 'Bad',
      message: 'Invalid achievement id'
    });
    const granted = achieve.createAchievement({
      userId: user.id
    });
    if (!granted) return res.send({
      status: 'Bad',
      message: 'Achievement not granted'
    });

    await user.update({
      exp: user.exp += achieve.completionExp
    });
    return sendRes(res, true, 200, 'Achievement granted', user.exp);
  } catch (err) {
    return sendRes(res, false, 500, 'Error granting achievement', err);
  }
};

export default {
  getUserAchievements,
  getAllAchievements,
  grantAchievement,
};
