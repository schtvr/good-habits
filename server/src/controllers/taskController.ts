import Task from '../models/task';
import { Request, Response } from 'express';
import sendRes from '../funcs/sendRes';
import checkAchievements from '../funcs/checkAchievements';
import { createUpdate } from '../interfaces/Update';
import TaskHistory from '../models/taskHistory';
import getDaysApart from '../funcs/getDailyTasks/getDaysApart';
import addTasks from '../funcs/getDailyTasks/addTasks';
import checkQuestCompleted from '../funcs/checkQuestCompleted';
import fixOldTasks from '../funcs/fixOldTasks';

const getTaskById = async (req: Request, res:Response) => {
  try {
    if (!req.params.id) return sendRes(res, false, 422, 'Missing taskId');
    const foundTask = await Task.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!foundTask) return sendRes(res, false, 422, 'No task found with that id');
    return sendRes(res, true, 200, 'Enjoy your task poggers xD rawr *holds up spork*\nnewline (please retweet, don\'t forget to smash that mfkin like button my guy)', foundTask);
  } catch (err) {
    return sendRes(res, false, 500, 'Server error getting task', err);
  }
};

const completeTaskById = async (req: Request, res:Response) => {
  try {
    const user = req.user;
    if (!user) return sendRes(res, false, 403, 'Not authenticated');
    if (!req.params.taskId) return sendRes(res, false, 422, 'Missing taskId');

    const task = await Task.findOne({
      where: {
        id: req.params.taskId
      }
    });
    if (!task) return sendRes(res, false, 403, 'Invalid task id');
    
    const completed = await TaskHistory.findOne({
      where: {
        userId: user.id,
        taskId: req.params.taskId
      }
    });
    if (completed) return sendRes(res, false, 400, 'You already completed this task (dummy)!');
    
    const completedTask = await task.complete(user.id, true);
    const update = createUpdate();
    update.gainedExp += task.completionExp;
    update.tasks.push(completedTask);

    await checkAchievements(user, 'Tasks', update);
    await checkQuestCompleted(user, task, update);

    await user.update({
      exp: user.exp += update.gainedExp
    });
    
    return sendRes(res, true, 200, 'Task completed', update);
  } catch (err) {
    return sendRes(res, false, 500, 'Server error completing task', err);
  }
};

const getQuestTasks = async (req: Request, res: Response) => {
  const questId = req.params.questId;
  if (questId === undefined) return sendRes(res, false, 403, 'Please provide a quest id in the url parameters');
  try {
    const tasks = await Task.findAll({
      where: {
        questId
      }
    });
    return sendRes(res, true, 200, 'Quest tasks retrieved', tasks);

  } catch (err) {
    return sendRes(res, false, 500, 'Server error finding quest tasks', err);
  }
};

const getTaskHistory = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) return sendRes(res, false, 403, 'Not a valid user');
    await fixOldTasks(user);
    const taskHistory = await user.getTaskHistory();
    return sendRes(res, true, 200, 'Task history retrieved', taskHistory);
  } catch (err) {
    sendRes(res, false, 500, 'Server error retrieving task history', err);
  }
};

const getDailyTasks = async (req: Request, res: Response) => {
  console.log('DAILY CALL');
  const user = req.user;
  if (!user) return sendRes(res, false, 403, 'Not a valid user');

  const dailyTasks: Task[] = [];

  try {
    const activeQuests = await user.getActiveQuests();
    if (!activeQuests) return sendRes(res, false, 403, 'User has no active quests');
    
    const currDate = Date.now();
    for await (const quest of activeQuests) {
      const daysApart = getDaysApart(currDate, quest.startDate.getTime());
      await addTasks(quest.questId, daysApart, dailyTasks);
    }
    
    return sendRes(res, true, 200, 'Daily tasks retrieved', dailyTasks);
  } catch (err) {
    sendRes(res, false, 500, 'Server error getting daily tasks');
  }
};

export default {
  getTaskById,
  completeTaskById,
  getQuestTasks,
  getTaskHistory,
  getDailyTasks
};