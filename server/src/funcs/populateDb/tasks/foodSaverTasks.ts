import Quest from '../../../models/quest';

const tasks = [
  {
    name: 'How many times did you eat out?',
    description: 'Did you eat out only once this week?',
    completionExp: 70, 
    index: 1,
    day: 7 
  },
  {
    name: 'How many times did you eat out?',
    description: 'Did you eat out only once this week?',
    completionExp: 70, 
    index: 2,
    day: 14
  },
  {
    name: 'How many times did you eat out?',
    description: 'Did you eat out only once this week?',
    completionExp: 70, 
    index: 3,
    day: 21 
  }
];

const createFoodTasks = async (quest: Quest) => {
  for await (const task of tasks) {
    await quest.createTask(task)
  }
};

export default createFoodTasks;