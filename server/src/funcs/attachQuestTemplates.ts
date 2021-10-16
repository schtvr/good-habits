import User from '../models/user';
import Quest from '../models/quest';
import { Op } from 'sequelize';

const attachQuestTemplates = async (friends: User[]) => {
  for await (const friend of friends) {
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
  }
};

export default attachQuestTemplates;
