import { Request, Response } from 'express';
import { IVerifiedRequest } from '../middlewares/auth';
import Quest from '../models/quest';

const startQuest = async (req: Request, res: Response) => {
  if (!req.user) return res.status(400).send('Not authenticated');
  if (!req.questId) return res.status(422).send('Missing form information');
  try {
    const questToStart = await Quest.findOne({ where: { id: req.questId }});
    if (!questToStart) return res.status(422).send('Invalid quest Id');
    const activeQuest = await questToStart.createActiveQuest({
      userId: req.user.id
    });
    if (!activeQuest) res.status(500).send('Error creating quest');
    return res.status(200).send(activeQuest);
  } catch (err) {
    return res.status(500).send('Error starting quest.');
  }
};

const completeQuest = async (req: Request, res: Response) => {
  if (!req.user) return res.status(400).send('Not authenticated');
  if (!req.questId) return res.status(422).send('Missing form information');
  try {
    const questToComplete = await req.user.getActiveQuests({ 
      where: { 
        id: req.questId 
      }
    }); 
    if (!questToComplete) return res.status(422).send('Invalid quest Id');
    questToComplete[0].complete();
    return res.status(200).send('Quest completed');
  } catch (err) {
    return res.status(500).send('Server errored when completing quest.');
  }
};

const getUserActiveQuests = async (req: IVerifiedRequest, res: Response) => {
  if (!req.user) return res.status(400).send('Not authenticated');
  try {
    const userQuests = await req.user.getActiveQuests();
    res.status(200).send({
      activeQuests: userQuests
    });
  } catch (err) {
    res.status(500).send('Error retrieving user\'s quests');
  }
};

const getQuestTemplates = async (req: Request, res: Response) => {
  try {
    const allQuests = await Quest.findAll();
    res.status(200).send({
      quests: allQuests
    });
  } catch (err) {
    res.status(500).send('Error retrieving quests');
  }
};

const getQuestTasks = async (req: Request, res: Response) => {
  const { questId } = req.body;
  if (!questId) return res.status(422).send('Invalid form, please send questId');
  try {
    const template = await Quest.findOne({
      where: {
        id: questId 
      }
    });
    if (!template) return res.status(500).send('Invalid questId: quest template does not exist');
    const tasks = await template.getTasks();
    return res.status(200).send({
      tasks
    });
  } catch (err) {
    res.status(500).send('Error retrieving quest tasks');
  }
};

export default {
  startQuest,
  completeQuest,
  getUserActiveQuests,
  getQuestTemplates,
  getQuestTasks
};
