import { Request, Response, Express } from 'express';
import Quest from '../models/quest';
import ActiveQuest from '../models/activeQuest';
import User from '../models/user';

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
        id: req.params.questId 
      }
    });
    
    if (!questToComplete || questToComplete.length === 0) 
    return sendRes(res, false, 422, 'Invalid quest Id');
    
    const template = await Quest.findOne({
      where: {
        id: questToComplete[0].questId
      }
    });
    if (!template) return res.status(422).send({
      status: 'Bad',
      message: 'Invalid quest Id'
    });
    
    user.exp += template.completionExp;
    await User.update(
      { exp: user.exp },
      { where: {
        id: user.id
      }});
    if (!await questToComplete[0].complete()) {
      return res.status(500).send({
        status: 'Bad',
        message: 'Server error completing quest'
      });
    }
    return res.status(200).send({
      status: 'Okay',
      message: 'Quest completed',
      exp: user.exp
    });
  } catch (err) {
    return res.status(500).send({
      status: 'Bad',
      message: 'Server errored when completing quest.',
      data: err
    });
  }
};

const getUserActiveQuests = async (req: Request, res: Response) => {
  if (!req.user) return res.status(400).send({
    status: 'Bad',
    message: 'Not authenticated'
  });
  try {
    const userQuests = await req.user.getActiveQuests();
    res.status(200).send({
      status: 'Okay',
      message: 'Retreived user\'s active quests',
      data: userQuests
    });
  } catch (err) {
    res.status(500).send({
      status: 'Bad',
      message: 'Error retrieving user\'s quests',
      data: err
    });
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