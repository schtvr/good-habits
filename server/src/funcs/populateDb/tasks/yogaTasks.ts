import Quest from '../../../models/quest';

const tasks = [
  {
    name: 'Yoga time!',
    description: 'When you have the change, practice yoga for one hour! Feel the relaxation!',
    completionExp: 70, 
    index: 1,
    day: 3 
  },
  {
    name: 'Yoga time!',
    description: 'When you have the change, practice yoga for one hour! Feel the relaxation!',
    completionExp: 70, 
    index: 2,
    day: 7 
  },
  {
    name: 'Yoga time!',
    description: 'When you have the change, practice yoga for one hour! Feel the relaxation!',
    completionExp: 70, 
    index: 3,
    day: 10 
  },
  {
    name: 'Yoga time!',
    description: 'When you have the change, practice yoga for one hour! Feel the relaxation!',
    completionExp: 70, 
    index: 4,
    day: 14 
  },
  {
    name: 'Yoga time!',
    description: 'When you have the change, practice yoga for one hour! Feel the relaxation!',
    completionExp: 70, 
    index: 5,
    day: 17 
  },
  {
    name: 'Yoga time!',
    description: 'When you have the change, practice yoga for one hour! Feel the relaxation!',
    completionExp: 70, 
    index: 6,
    day: 21 
  },
  {
    name: 'Yoga time!',
    description: 'When you have the change, practice yoga for one hour! Feel the relaxation!',
    completionExp: 70, 
    index: 7,
    day: 24 
  },
  {
    name: 'Yoga time!',
    description: 'When you have the change, practice yoga for one hour! Feel the relaxation!',
    completionExp: 70, 
    index: 8,
    day: 28
  },
  {
    name: 'Yoga time!',
    description: 'When you have the change, practice yoga for one hour! Feel the relaxation!',
    completionExp: 70, 
    index: 9,
    day: 31 
  },
  {
    name: 'Yoga time!',
    description: 'When you have the change, practice yoga for one hour! Feel the relaxation!',
    completionExp: 70, 
    index: 10,
    day: 35
  },
  {
    name: 'Yoga time!',
    description: 'When you have the change, practice yoga for one hour! Feel the relaxation!',
    completionExp: 70, 
    index: 11,
    day: 38
  },
  {
    name: 'Yoga time!',
    description: 'When you have the change, practice yoga for one hour! Feel the relaxation!',
    completionExp: 70, 
    index: 12,
    day: 41 
  },
  {
    name: 'Yoga time!',
    description: 'When you have the change, practice yoga for one hour! Feel the relaxation!',
    completionExp: 70, 
    index: 13,
    day: 45 
  },
  {
    name: 'Yoga time!',
    description: 'When you have the change, practice yoga for one hour! Feel the relaxation!',
    completionExp: 70, 
    index: 14,
    day: 48 
  },
  {
    name: 'Yoga time!',
    description: 'When you have the change, practice yoga for one hour! Feel the relaxation!',
    completionExp: 70, 
    index: 15,
    day: 51 
  },
  {
    name: 'Yoga time!',
    description: 'When you have the change, practice yoga for one hour! Feel the relaxation!',
    completionExp: 70, 
    index: 16,
    day: 56 
  },
];

const createYogaTasks = async (quest: Quest) => {
  for await (const task of tasks) {
    await quest.createTask(task)
  }
};

export default createYogaTasks;