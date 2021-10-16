import Task from '../models/task';
import Quest from '../models/quest';
import { IUpdate } from '../interfaces/Update';
import User from '../models/user';
import checkAchievements from './checkAchievements';

const checkQuestCompleted = async (user: User, task: Task, update: IUpdate) => {
  try {
    const quest = await Quest.findOne({
      where: {
        id: task.questId
      }
    });
    if (!quest) return false;
    
    if (task.index === quest.taskCount) {
      update.gainedExp += quest.completionExp;
      update.quests.push(quest);

      const activeQuest = await user.getActiveQuests({
        where: {
          questId: task.questId
        } 
      });

      await activeQuest[0].complete();
      await checkAchievements(user, 'Quests', update);
    }
  } catch (err) {
    return false;
  }
};

export default checkQuestCompleted;
