import Quest from '../../models/quest';
import Task from '../../models/task';

const addTasks = async (questId: number, daysApart: number, dailyTasks: Task[]) => {
  const quest = await Quest.findByPk(questId, {
    include: [
      { model: Task,
        as: 'tasks',
        where: {
          day: daysApart
        }
      }
    ]
  });
  if (!quest) return;
  // @ts-ignore
  if (quest.tasks) {
    // @ts-ignore
    dailyTasks.push(quest.tasks[0]);
  }
};

export default addTasks;