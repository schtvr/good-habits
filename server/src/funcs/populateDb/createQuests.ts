import Quest from '../../models/quest';
import createMedidateTasks from './tasks/mediationTasks';
import createCouchTasks from './tasks/couchto5kTasks';

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
  await Quest.create({
    name: 'Take your meds',
    duration: 7,
    description: 'Take your anti-psychotics',
    category: 'Health',
    completionExp: 300,
    taskCount: 7
  });
  const meditateQuest = await Quest.create({
    name: 'Mediation crash course',
    duration: 30,
    description: 'Mediate for a whole fkn month straight without stopping',
    category: 'Spirtual',
    completionExp: 1,
    taskCount: 5
  });
  
  await createMedidateTasks(meditateQuest);
  await createCouchTasks(couchQuest);
};

export default createQuests;
