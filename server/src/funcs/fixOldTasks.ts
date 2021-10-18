import User from '../models/user';
import TaskHistory from '../models/taskHistory';
import Task from '../models/task';
import getDaysApart from './getDailyTasks/getDaysApart';
import { Op } from 'sequelize';

const fixOldTasks = async (user: User) => {
  try {
    const activeQuests = await getUserActiveQuests(user);
    const currDate = Date.now();
    for await (const quest of activeQuests) {
      const currDay = getDaysApart(currDate, quest.startDate.getTime()) - 1;
      if (currDay > 0) {
        const tasks = await getQuestTasks(quest.questId);
        const completedTasks = await getCompletedTasksForQuest(user, quest.questId);
        const completedIds = getCompletedIds(completedTasks); 
        await markNotCompleted(user, tasks, completedIds, currDay);
      }
    }
    const completedQuests = await getUserCompletedQuests(user);
    for await (const quest of completedQuests) {
      const currDay = getDaysApart(currDate, quest.startDate.getTime()) - 1;
      const tasks = await getQuestTasks(quest.questId);
      const completedTasks = await getCompletedTasksForQuest(user, quest.questId);
      const completedIds = getCompletedIds(completedTasks); 
      await markNotCompleted(user, tasks, completedIds, currDay);
      await quest.update({
        progress: 1
      });
    }
  } catch (err) {
    console.log('Error marking old tasks incomplete');
  }
};

const markNotCompleted = async (user: User, tasks: Task[], completed: number[], currDay: number) => {
  for await (const task of tasks) {
    if ((task.day < currDay) && !completed[task.id]) {
      console.log('MARKIGN TASK INCOMPLETE');
      await user.createTaskHistory({
        taskId: task.id,
        questId: task.questId,
        completed: false
      });
    }
  }
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

const getUserCompletedQuests = async (user: User) => {
  try {
    const completedQuests = await user.getCompletedQuests({
      where: {
        progress: {
          [Op.not]: 1
        } 
      }
    });
    return completedQuests;
  } catch (err) {
    return [];
  }
};

const getQuestTasks = async (questId: number) => {
  try {
    const tasks = await Task.findAll({
      where: {
        questId
      }
    });
    return tasks;
  } catch (err) {
    return [];
  }
};

const getCompletedTasksForQuest = async (user: User, questId: number) => {
  try {
    const userHistory = await user.getTaskHistory({
      where: {
        questId: questId
      }
    });
    return userHistory;
  } catch (err) {
    return [];
  }
};

export default fixOldTasks;

