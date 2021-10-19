import Quest from '../../../models/quest';

const tasks = [
  {
    name: 'Embark on your spiritual journey!',
    description: 'Time to start medidating! Take 15 minutes to sit alone and think about rivers',
    completionExp: 15,
    index: 1,
    day: 1
  },
  {
    name: 'Continue your Spiritual journey',
    description: 'Today, try and take 20 minutes of peaceful alone time and quietly contemplate the vast expanse of the universe.',
    completionExp: 20,
    index: 2,
    day: 3
  },
  {
    name: 'Halfway to enlightenment',
    description: 'Take 25 minutes, sit peacefully, and let your thoughts flow freely. Place no judgement on them, and accept them for what they are, simple thoughts (for you maybe mine are hella complex)',
    completionExp: 25,
    index: 3,
    day: 6
  },
  {
    name: 'Spiritual Guru',
    description: 'Today 30 minutes of meditation will leave you calmer than ever. Focus on the beauty of nature, specifically mountains. They are large and beautiful, don\'t you think?',
    completionExp: 30,
    index: 4,
    day: 9
  },
  {
    name: 'Nirvana Awaits',
    description: 'Today marks the final day on your meditation adventure. Take 30 minutes and reflect on how far you\'ve come, and the journeys that await you.',
    completionExp: 50,
    index: 5,
    day: 12
  }
];

const createMedidateTasks = async (quest: Quest) => {
  for await (const task of tasks) {
    await quest.createTask(task);
  }
};

export default createMedidateTasks;