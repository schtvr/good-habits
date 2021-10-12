import { Request, Response } from 'express';
import User from '../models/user';
import Achievement from '../models/achievement';
import AchievementTemplate from '../models/achievementTemplate';


const getUserAchievements = async (req: Request, res: Response) => {
  const { user } = req;
  if (!user) return res.status(400).send({
    status: 'Bad',
    message: 'Not authenticated'
  });
  try {
    const achievements = await user.getAchievements();
    res.status(200).send({
      status: 'Okay',
      message: 'Achievements retrieved',
      data: achievements
    });
  } catch (err) {
    res.status(500).send({
      status: 'Bad',
      message: 'Error retrieving achievements'
    });
  }
};

const getAllAchievements = async (req: Request, res: Response) => {
  try {
    const allAchievements = await AchievementTemplate.findAll();
    res.status(200).send({
      status: 'Okay',
      message: 'Achievement templates retreieved',
      data: allAchievements
    });
  } catch (err) {
    res.status(500).send({
      status: 'Bad',
      message: 'Error retrieving achievements'
    });
  }
};
const grantAchievement = async (req: Request, res: Response) => {
  const { user } = req;
  const achievementId: string = req.params.id;
  if (!user) return res.status(400).send('Not authenticated');
  if (achievementId === undefined) return res.status(422).send({
    status: 'Bad',
    message: 'Missing form information'
  });
  try {
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

    user.exp += achieve.completionExp;
    await User.update(
      { ...user },
      { where: {
        id: user.id
      }}
    );
    return res.status(200).send({
      status: 'Okay',
      message: 'Achievement granted',
      data: user
    });
  } catch (err) {
    res.status(500).send({
      status: 'Bad',
      message: 'Error granting achievement'
    });
  }
};

export default {
  getUserAchievements,
  getAllAchievements,
  grantAchievement,
};
