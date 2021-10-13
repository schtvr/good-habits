import Quest from '../../../models/quest';

const tasks = [
  {
    name: 'It all starts here!',
    description: 'Day one of your couch to 5k journey! Try run 1.5k, and walk for another 500m',
    completionExp: 20,
    index: 1,
    day: 1
  },
  {
    name: 'Keep it up!',
    description: 'Run 1.5k, walk 250m',
    completionExp: 20,
    index: 2,
    day: 2
  },
  {
    name: 'Dont stop now!',
    description: 'Run 2k!',
    completionExp: 20,
    index: 3,
    day: 3
  },
  {
    name: 'You got this champ!',
    description: 'Run or walk 2.5k',
    completionExp: 20,
    index: 4,
    day: 4
  },
  {
    name: 'Well deservered break',
    description: 'No running today! Rest up and get back at it tomorrow',
    completionExp: 10,
    index: 5,
    day: 5
  },
  {
    name: 'Back to the grind',
    description: 'Run 2.5k, walk 500m',
    completionExp: 20,
    index: 6,
    day: 6
  },
  {
    name: 'No rest for the wicked',
    description: 'Run 2.5k, walk 500m',
    completionExp: 20,
    index: 7,
    day: 7
  },
  {
    name: 'You are amazing, wow!',
    description: 'Run 2.5k, walk 500m',
    completionExp: 20,
    index: 8,
    day: 8
  },
  {
    name: 'HELP ME',
    description: 'Please help I am stuck in a Chinese factory I have been kidnapped my name is Xi if anyone is reading this call the authorities',
    completionExp: 20,
    index: 9,
    day: 9
  },
  {
    name: 'You\'re on fire!',
    description: 'Run 2.5k, walk 500m',
    completionExp: 20,
    index: 10,
    day: 10
  },
  {
    name: 'Rest tomorrow, but not yet!',
    description: 'Walk or run three kilometers',
    completionExp: 20,
    index: 11,
    day: 11
  },
  {
    name: 'Rest easy',
    description: 'Another rest day, but take some time to relax and appreciate how far you\'ve come',
    completionExp: 10,
    index: 12,
    day: 13
  },
  {
    name: 'Back at it',
    description: 'Run 2.75k, walk another 500m',
    completionExp: 20,
    index: 14,
    day: 14
  },
  {
    name: 'The unstoppable jogger',
    description: 'Run 3k, walk another 500m',
    completionExp: 20,
    index: 15,
    day: 15
  },
  {
    name: 'Who said running wasn\'t easy?',
    description: 'Run 3k, walk another 500m',
    completionExp: 20,
    index: 16,
    day: 16
  },
  {
    name: 'Push it to the limit!',
    description: 'Run 3.5k, walk another 500m',
    completionExp: 20,
    index: 17,
    day: 17
  },
  {
    name: 'Break soon!',
    description: 'Wwlk or run 3.5k',
    completionExp: 20,
    index: 18,
    day: 18
  },
  {
    name: 'Wipe off the sweat',
    description: 'Rest day! Yaaayyy!',
    completionExp: 15,
    index: 19,
    day: 19
  },
  {
    name: 'Getting there!',
    description: 'Run 4k, walk 500m',
    completionExp: 25,
    index: 20,
    day: 20
  },
  {
    name: 'Keep it up!',
    description: 'Run 4k, walk 500m',
    completionExp: 25,
    index: 21,
    day: 21
  },
  {
    name: 'You\'re a beast!',
    description: 'Run 4k, walk 500m',
    completionExp: 25,
    index: 22,
    day: 22
  },
  {
    name: 'Almost there!',
    description: 'Run 4k, walk 500m',
    completionExp: 25,
    index: 23,
    day: 23
  },
  {
    name: 'HOLY MOLY YOU RUN ALOT',
    description: 'Run 4.5k, walk 500m',
    completionExp: 25,
    index: 24,
    day: 24
  },
  {
    name: 'PUSH IT',
    description: 'Walk or run 4.5k',
    completionExp: 25,
    index: 25,
    day: 25
  },
  {
    name: 'Rest up, you\'ll need it!',
    description: 'Relax and regain your strength, you\'re almost there!',
    completionExp: 15,
    index: 26,
    day: 26
  },
  {
    name: 'Final prep',
    description: 'Run 4.5k ',
    completionExp: 35,
    index: 27,
    day: 27
  },
  {
    name: 'RUN THAT 5k',
    description: 'YOU GOT THIS, RUN 5k',
    completionExp: 200,
    index: 28,
    day: 28
  },
];

const createCouchTasks = async (quest: Quest) => {
  for await (const task of tasks) {
    await quest.createTask(task);
  }
};

export default createCouchTasks;