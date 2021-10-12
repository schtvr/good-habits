import { Request, Response, Express } from 'express';
import Quest from '../models/quest';
import ActiveQuest from '../models/activeQuest';
import User from '../models/user';
import AchievementTemplate from '../models/achievementTemplate';

const startQuest = async (req: Request, res: Response) => {
  if (!req.user) return res.status(400).send({
    status: 'Bad',
    message: 'Not authenticated'
  });

  if (!req.params.questId) return sendRes(res, false, 422, 'Missing Form information');

  try {
    const uniqueness = await ActiveQuest.findOne({ 
      where: {
        userId: req.user.id, 
        questId: req.params.questId }
    });
    if (uniqueness) return sendRes(res, false, 422, 'Duplicate quest');
    
    const questToStart = await Quest.findOne({ 
      where: { 
        id: req.params.questId }
    });
    if (!questToStart) return sendRes(res, false, 422, 'Invalid quest Id');
    
    const activeQuest = await questToStart.createActiveQuest({
      userId: req.user.id
    });
    
    const quests = await req.user.getActiveQuests();
    
    if (!activeQuest) sendRes(res, false, 500, 'Error creating quest');
    
    return sendRes(res, true, 200, 'Quest started', activeQuest);
    
  } catch (err) {
    return sendRes(res, false, 500, 'Error starting quest', err);
  }
};

const completeQuest = async (req: Request, res: Response) => {
  const { user } = req;
  if (!user) return sendRes(res, false, 400, 'Not authenticated');
  
  if (!req.params.questId) return sendRes(res, false, 422, 'Missing form information');
  
  try {
    const questToComplete = await user.getActiveQuests({ 
      where: { 
        questId: req.params.questId 
      }
    });
    
    if (!questToComplete || questToComplete.length === 0) 
      return sendRes(res, false, 422, 'Invalid quest Id');
    
    const template = await Quest.findOne({
      where: {
        id: questToComplete[0].questId
      }
    });
    if (!template) return sendRes(res, false, 422, 'Invalid quest Id');
    
    user.exp += template.completionExp;
    await User.update(
      { exp: user.exp },
      { where: {
        id: user.id
      }});
    
    if (!await questToComplete[0].complete()) sendRes(res, false, 500, 'Server error completing quest');
    await checkAchievements(user);
    return sendRes(res, true, 200, 'Quest completed', user.exp);
  } catch (err) {
    return sendRes(res, false, 500, 'Server errored when completing quest.', err);
  }
};

const getUserActiveQuests = async (req: Request, res: Response) => {
  if (!req.user) return sendRes(res, false, 422, 'Not authenticated');
  try {
    const userQuests = await req.user.getActiveQuests();
    return sendRes(res, true, 200, 'Retreived user\'s active quests', userQuests);
  } catch (err) {
    return sendRes(res, false, 500, 'Error retrieving user\'s quests', err);
  }
};

const getQuestTemplates = async (req: Request, res: Response) => {
  try {
    const allQuests = await Quest.findAll();
    res.status(200).send({
      status: 'Okay',
      message: 'Retrieved quest templates',
      data: allQuests
    });
  } catch (err) {
    res.status(500).send({
      status: 'Bad',
      message: 'Error retrieving quests',
      data: err
    });
  }
};

const getQuestTasks = async (req: Request, res: Response) => {
  const questId = req.params.questId;
  if (!questId) return res.status(422).send({
    status: 'Bad',
    message: 'Invalid form, please send questId'
  });
  try {
    const template = await Quest.findOne({
      where: {
        id: questId 
      }
    });
    if (!template) return res.status(500).send({
      status: 'Bad',
      message: 'Invalid questId: quest template does not exist'
    });
    const tasks = await template.getTasks();
    return res.status(200).send({
      status: 'Okay',
      message: 'Retreived quest tasks',
      data: tasks
    });
  } catch (err) {
    res.status(500).send({
      status: 'Bad',
      message: 'Error retrieving quest tasks',
      data: err
    });
  }
};

export default {
  startQuest,
  completeQuest,
  getUserActiveQuests,
  getQuestTemplates,
  getQuestTasks
};

const sendRes = (res: Response, isGood: boolean, status: number, message: string, data?: any) => {
  res.status(status).send({
    status: `${isGood ? 'Okay' : 'Bad'}`,
    message,
    data: data
  });
};

const checkAchievements = async (user: User) => {
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