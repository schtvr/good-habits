import Task from '../models/task';
import { Request, Response } from 'express';
import sendRes from '../funcs/sendRes';
import checkAchievements from '../funcs/checkAchievements';
import { createUpdate } from '../interfaces/Update';
import TaskHistory from '../models/taskHistory';
import getDaysApart from '../funcs/getDailyTasks/getDaysApart';
import addTasks from '../funcs/getDailyTasks/addTasks';
import checkQuestCompleted from '../funcs/checkQuestCompleted';
import ActiveQuest from '../models/activeQuest';
import Quest from '../models/quest';
import User from '../models/user';

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
    
    await fixOldTasks(user);
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


const fixOldTasks = async (user: User) => {
  
  
  // get task history
  // get completed & active quests
  
  
  // active quest ---> get tasks
  // get user completed tasks for that quest ---->
  // find difference between start of quest and now - 1
  // for each task of quest from start to index
  // if task not in completed task --->
  // create task history with completed = false
  
  const activeQuests = await getUserActiveQuests(user);
  const currDate = Date.now();
  for await (const quest of activeQuests) {
    const currDay = getDaysApart(currDate, quest.startDate.getTime()) - 1;

    const tasks = await getActiveQuestTasks(quest);

    const completedTasks = await getCompletedTasksForQuest(user, quest);
    const completed = getCompletedIds(completedTasks); 
    
    
    for (const task of tasks) {
      if ((task.day < currDay) && !completed[task.id]) {
        console.log('MARKIGN TASK INCOMPLETE');
        await user.createTaskHistory({
          taskId: task.id,
          questId: task.questId,
          completed: false
        });
      }
    }
  }

  // need to know active quests && their tasks
  // need to know what tasks the user has completed for each quest
  // need to know what day of the quest they are on
  // check for any missing tasks in between current day and task history
};

const getTaskDays = (tasks: Task[]) => {
  const taskDays = [];
  for (const task of tasks) {
    taskDays.push(task.day);
  }
  return taskDays;
};

const getCompletedIds = (history: TaskHistory[]) => {
  const scuffedObj: any = {};
  for (const task of history) {
    scuffedObj[task.taskId] = true;
  }
  return scuffedObj;
};

const getUserActiveQuests = async (user: User) => {
  try {
    const activeQuests = await user.getActiveQuests();
    return activeQuests;
  } catch (err) {
    return [];
  }
};

const getActiveQuestTasks = async (active: ActiveQuest) => {
  try {
    const tasks = await Task.findAll({
      where: {
        questId: active.questId
      }
    });
    return tasks;
  } catch (err) {
    return [];
  }
};

const getCompletedTasksForQuest = async (user: User, active: ActiveQuest) => {
  try {
    const userHistory = await user.getTaskHistory({
      where: {
        questId: active.questId
      }
    });
    return userHistory;
  } catch (err) {
    return [];
  }
};













export default {
  getTaskById,
  completeTaskById,
  getQuestTasks,
  getTaskHistory,
  getDailyTasks
};