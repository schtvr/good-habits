import Quest from '../../models/quest';
import createMedidateTasks from './tasks/mediationTasks';
import createCouchTasks from './tasks/couchto5kTasks';
import createAppleTasks from './tasks/appleTasks';
import createFoodTasks from './tasks/foodSaverTasks';
import createYogaTasks from './tasks/yogaTasks';
import createReadingTasks from './tasks/readinTrainingTasks';

const createQuests = async () => {
  const couchQuest = await Quest.create({
    name: 'Couch to 5k',
    duration: 28,
    description: 'Start running with the tried and tested \'Couch to 5k\' program!',
    category: 'Health',
    completionExp: 1000,
    taskCount: 28
  });
  await Quest.create({
    name: 'Posture check!',
    duration: 14,
    description: 'Check ya posture, goon',
    category: 'Health',
    completionExp: 500,
    taskCount: 0
  });
  const appleQuest = await Quest.create({
    name: 'An apple a day keeps the doctor away',
    duration: 14,
    description: 'Eat an apple every day for 2 weeks!',
    category: 'Health',
    completionExp: 150,
    taskCount: 14
  });
  const readingQuest = await Quest.create({
    name: 'Reading training!',
    duration: 60,
    description: 'read 10 pages a day to gain a reading habit!',
    category: 'Mental',
    completionExp: 550,
    taskCount: 60
  });
  const yogaQuest = await Quest.create({
    name: 'Yoga time!',
    duration: 60,
    description: 'practice Yoga twice a week for one hour!',
    category: 'Mental',
    completionExp: 450,
    taskCount: 16
  });
  const foodSaverQuest = await Quest.create({
    name: 'Save some pennies!',
    duration: 21,
    description: 'A quest to achieve financial balance! Only eat out once a week!',
    category: 'Financial',
    completionExp: 450,
    taskCount: 3
  });
  const meditateQuest = await Quest.create({
    name: 'Mediation crash course',
    duration: 30,
    description: 'Learn to medidate over the course of one month!',
    category: 'Spirtual',
    completionExp: 500,
    taskCount: 5
  });
  
  await createMedidateTasks(meditateQuest);
  await createCouchTasks(couchQuest);
  await createAppleTasks(appleQuest);
  await createFoodTasks(foodSaverQuest);
  await createYogaTasks(yogaQuest);
  await createReadingTasks(readingQuest);
};

export default createQuests;
