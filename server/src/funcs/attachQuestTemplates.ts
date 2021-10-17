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
    const templates = await Quest.findAll({
      where: {
        id: {
          [Op.in]: questIds
        }
      }
    });
    friend.setDataValue('quests', templates);
  }
};
