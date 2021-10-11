import { Request, Response, Express } from 'express';
import Quest from '../models/quest';
import ActiveQuest from '../models/activeQuest';

const startQuest = async (req: Request, res: Response) => {
  if (!req.user) return res.status(400).send({
    status: 'Bad',
    message: 'Not authenticated'
  });

  if (!req.params.questId) return res.status(422).send({
    status: 'Bad',
    message: 'Missing form information'
  });

  try {
    const uniqueness = await ActiveQuest.findOne({where: {userId:  req.user.id, questId: req.params.questId }})
    if (uniqueness) return res.status(422).send({
      status: 'Bad',
      message: 'Duplicate quest'
    });
    const questToStart = await Quest.findOne({ where: { id: req.params.questId }});
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
      data: activeQuest
    });
  } catch (err) {
    return res.status(500).send({
      status: 'Bad',
      message: 'Error starting quest.',
      data: err
    });
  }
};

const completeQuest = async (req: Request, res: Response) => {
  if (!req.user) return res.status(400).send({
    status: 'Bad',
    message: 'Not authenticated'
  });
  if (!req.params.questId) return res.status(422).send({
    status: 'Bad',
    message: 'Missing form information'
  });
  
  const user = req.user;
  try {
    const questToComplete = await req.user.getActiveQuests({ 
      where: { 
        id: req.params.questId 
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
