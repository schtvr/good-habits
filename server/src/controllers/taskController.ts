import Task from '../models/task';
import { Request, Response } from 'express';
import sendRes from '../funcs/sendRes';
import checkAchievements from '../funcs/checkQuestAchievements';

const getTaskById = async (req: Request, res:Response) => {
  try {
    if (!req.params.id) return sendRes(res, false, 422, 'Missing taskId');
    const foundTask = await Task.findOne({
      where: {
        id: req.params.id
      }
    });
    return sendRes(res, true, 200, 'Enjoy your task poggers xD rawr *holds up spork*\nnewline (please retweet, don\'t forget to smash that mfkin like button my guy)', foundTask);
  } catch (err) {
    return sendRes(res, false, 500, 'Server error getting task', err);
  }
};

const completeTaskById = async (req: Request, res:Response) => {
  try {
    if (!req.user) return sendRes(res, false, 403, 'Not authenticated');
    if (!req.params.taskId) return sendRes(res, false, 422, 'Missing taskId');
    const foundTask = await req.user.getTaskHistory({ where: { id: req.params.taskId }});

    const result = await foundTask[0].complete();
    await checkAchievements(req.user, 'Tasks');
    if (result) return sendRes(res, true, 200, 'Task completed');
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
    const taskHistory = await user.getTaskHistory();
    return sendRes(res, true, 200, 'Task history retrieved', taskHistory);
  } catch (err) {
    sendRes(res, false, 500, 'Server error retrieving task history', err);
  }
};

export default {
  getTaskById,
  completeTaskById,
  getQuestTasks,
  getTaskHistory
};