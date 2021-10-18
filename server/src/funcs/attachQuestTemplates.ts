import User from '../models/user';
import Quest from '../models/quest';
import { Op } from 'sequelize';

export const attachQuestTemplates = async (friends: User[]) => {
  for await (const friend of friends) {
    await attachTemplatesToUser(friend);
  }
};

export const attachTemplatesToUser = async (friend: User) => {
  if (friend.activeQuests) {
    const questIds: number[] = [];
    friend.activeQuests.forEach(quest => {
      questIds.push(quest.questId);
    });
    const templates = await getTemplatesFromIds(questIds);
    friend.setDataValue('quests', templates);
  }
  
  if (friend.completedQuests) {
    const questIds: number[] = [];
    friend.completedQuests.forEach(quest => {
      questIds.push(quest.questId);
    });
    const templates = await getTemplatesFromIds(questIds);
    friend.setDataValue('complQuests', templates);
  }
};

const getTemplatesFromIds = async (questIds: number[]) => {
  const templates = await Quest.findAll({
    where: {
      id: {
        [Op.in]: questIds
      }
    }
  });
  return templates;
};
