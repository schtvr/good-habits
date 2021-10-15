import TaskHistory from '../models/taskHistory';
import AchievementTemplate from '../models/achievementTemplate';
import Quest from '../models/quest';

export interface IUpdate {
  achievements: AchievementTemplate[]
  tasks: TaskHistory[]
  quests: Quest[]
  friend: any[]
  gainedExp: number
}

export const createUpdate = (): IUpdate => {
  return {
    achievements: [],
    tasks: [],
    quests: [],
    friend: [],
    gainedExp: 0
  };
};