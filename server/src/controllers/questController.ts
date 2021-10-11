import { Request, Response } from 'express';
import { IVerifiedRequest } from '../middlewares/auth';
import Quest from '../models/quest';

const startQuest = async (req: Request, res: Response) => {
  if (!req.user) return res.status(400).send({
    status: 'Bad',
    message: 'Not authenticated'
  });
  if (!req.questId) return res.status(422).send({
    status: 'Bad',
    message: 'Missing form information'
  });
  try {
    const questToStart = await Quest.findOne({ where: { id: req.questId }});
    if (!questToStart) return res.status(422).send({
      status: 'Bad',
      message: 'Invalid quest Id'
    });
    const activeQuest = await questToStart.createActiveQuest({
      userId: req.user.id
    });
    if (!activeQuest) res.status(500).send({
      status: 'Bad',
      message: 'Error creating quest'
    });
    return res.status(200).send({
      status: 'Okay',
      message: 'Quest started',
      activeQuest
    });
  } catch (err) {
    return res.status(500).send({
      status: 'Bad',
      message: 'Error starting quest.',
      error: err
    });
  }
};

const completeQuest = async (req: Request, res: Response) => {
  if (!req.user) return res.status(400).send({
    status: 'Bad',
    message: 'Not authenticated'
  });
  if (!req.questId) return res.status(422).send({
    status: 'Bad',
    message: 'Missing form information'
  });
  try {
    const questToComplete = await req.user.getActiveQuests({ 
      where: { 
        id: req.questId 
      }
    }); 
    if (!questToComplete) return res.status(422).send({
      status: 'Bad',
      message: 'Invalid quest Id'
    });
    questToComplete[0].complete();
    return res.status(200).send({
      status: 'Okay',
      message: 'Quest completed'
    });
  } catch (err) {
    return res.status(500).send({
      status: 'Bad',
      message: 'Server errored when completing quest.',
      error: err
    });
  }
};

const getUserActiveQuests = async (req: IVerifiedRequest, res: Response) => {
  if (!req.user) return res.status(400).send({
    status: 'Bad',
    message: 'Not authenticated'
  });
  try {
    const userQuests = await req.user.getActiveQuests();
    res.status(200).send({
      status: 'Okay',
      message: 'Retreived user\'s active quests',
      activeQuests: userQuests
    });
  } catch (err) {
    res.status(500).send({
      status: 'Bad',
      message: 'Error retrieving user\'s quests',
      error: err
    });
  }
};

const getQuestTemplates = async (req: Request, res: Response) => {
  try {
    const allQuests = await Quest.findAll();
    res.status(200).send({
      status: 'Okay',
      message: 'Retrieved quest templates',
      quests: allQuests
    });
  } catch (err) {
    res.status(500).send({
      status: 'Bad',
      message: 'Error retrieving quests',
      error: err
    });
  }
};

const getQuestTasks = async (req: Request, res: Response) => {
  const { questId } = req.body;
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
      tasks
    });
  } catch (err) {
    res.status(500).send({
      status: 'Bad',
      message: 'Error retrieving quest tasks',
      error: err
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
