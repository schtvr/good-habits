import { Request, Response } from 'express';
import Achievement from '../models/achievement';
import AchievementTemplate from '../models/achievementTemplate';

const getUserAchievements = async (req: Request, res: Response) => {
  const { user } = req;
  if (!user) return res.status(400).send('Not authenticated');
  try {
    const achievements = await user.getAchievements();
    res.status(200).send({
      achievements
    });
  } catch (err) {
    res.status(500).send('Error retrieving achievements');
  }
};

const getAllAchievements = async (req: Request, res: Response) => {
  try {
    const allAchievements = await Achievement.findAll();
    res.status(200).send({
      allAchievements
    });
  } catch (err) {
    res.status(500).send('Error retrieving achievements');
  }
};

const getAchievement = async (req: Request, res: Response) => {
  const { user } = req;
  const { achievementId } = req.body;
  if (!user) return res.status(400).send('Not authenticated');
  if (!achievementId) return res.status(422).send('Missing form information');
  try {
    const achieve = await AchievementTemplate.findOne({
      where: {
        id: achievementId
      }
    });
    if (!achieve) return res.status(422).send('Invalid achievement id');
    const granted = achieve.createAchievement({
      userId: user.id
    });
    if (!granted) return res.send('Achievement not granted');
    return res.status(200).send('Achievement granted');
  } catch (err) {
    res.status(500).send('Error granting achievement');
  }
};

module.exports = {
  getUserAchievements,
  getAllAchievements,
  getAchievement
};
