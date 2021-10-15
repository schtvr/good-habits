import Quest from '../../../models/quest';
const tasks = [
  {
    name: 'Apple time!',
    description: 'Eat an apple!',
    completionExp: 10,
    index: 1,
    day: 1
  },
  {
    name: 'Apple time!',
    description: 'Eat an apple!',
    completionExp: 10, 
    index: 2,
    day: 2
  },
  {
    name: 'Apple time!',
    description: 'Eat an apple!',
    completionExp: 10, 
    index: 3,
    day: 3,
  },
  {
    name: 'Apple time!',
    description: 'Eat an apple!',
    completionExp: 10, 
    index: 4,
    day: 4
  },
  {
    name: 'Apple time!',
    description: 'Eat an apple!',
    completionExp: 10, 
    index: 5,
    day: 5
  },
  {
    name: 'Apple time!',
    description: 'Eat an apple!',
    completionExp: 10, 
    index: 6,
    day: 6
  },
  {
    name: 'Apple time!',
    description: 'Eat an apple!',
    completionExp: 10, 
    index: 7,
    day: 7
  },
  {
    name: 'Apple time!',
    description: 'Eat an apple!',
    completionExp: 10, 
    index: 8,
    day: 8
  },
  {
    name: 'Apple time!',
    description: 'Eat an apple!',
    completionExp: 10, 
    index: 9,
    day: 9
  },
  {
    name: 'Apple time!',
    description: 'Eat an apple!',
    completionExp: 10, 
    index: 10,
    day: 10
  },
  {
    name: 'Apple time!',
    description: 'Eat an apple!',
    completionExp: 10, 
    index: 11,
    day: 11
  },
  {
    name: 'Apple time!',
    description: 'Eat an apple!',
    completionExp: 10, 
    index: 12,
    day: 12
  },
  {
    name: 'Apple time!',
    description: 'Eat an apple!',
    completionExp: 10, 
    index: 13,
    day: 13,
  },
  {
    name: 'Apple time!',
    description: 'Eat an apple!',
    completionExp: 10, 
    index: 14,
    day: 14
  },
];

const createAppleTasks = async (quest: Quest) => {
  for await (const task of tasks) {
    await quest.createTask(task) ;
  }
};
export default createAppleTasks;