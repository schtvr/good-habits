import { Request, Response, Express } from 'express';
import Quest from '../models/quest';
import ActiveQuest from '../models/activeQuest';
import sendRes from '../funcs/sendRes';
import checkAchievements from '../funcs/checkQuestAchievements';
import { createUpdate } from '../interfaces/Update';

const startQuest = async (req: Request, res: Response) => {
  if (!req.user) return sendRes(res, false, 400, 'Not authenticated');
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
    if (!await questToComplete[0].complete()) sendRes(res, false, 500, 'Server error completing quest');
    
    await user.update({
      exp: user.exp += template.completionExp
    });

    const update = createUpdate();
    update.gainedExp += template.completionExp;
    update.quests.push(template);
    await checkAchievements(user, 'Quests', update);

    return sendRes(res, true, 200, 'Quest completed', update);
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
    return sendRes(res, true, 200, 'Retrieved quest templates', allQuests);
  } catch (err) {
    return sendRes(res, false, 500, 'Error retrieving quests', err);
  }
};

const getQuestTasks = async (req: Request, res: Response) => {
  const questId = req.params.questId;
  if (!questId) return sendRes(res, false, 422, 'Invalid form, please send questId');
  try {
    const template = await Quest.findOne({
      where: {
        id: questId 
      }
    });
    if (!template) return sendRes(res, false, 500, 'Invalid questId: quest template does not exist') ;
    const tasks = await template.getTasks();
    return sendRes(res, true, 200, 'Retreived quest tasks', tasks);
  } catch (err) {
    return sendRes(res, false, 500, 'Error retrieving quest tasks', err);
  }
};

export default {
  startQuest,
  completeQuest,
  getUserActiveQuests,
  getQuestTemplates,
  getQuestTasks
};
