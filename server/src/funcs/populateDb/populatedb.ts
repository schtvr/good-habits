import createAchievements from './createAchievements';
import createUsers from './createUsers';
import createQuests from './createQuests';

const populateDb = async () => {
  try {
    await createUsers();
    await createQuests();
    await createAchievements();
    
  } catch (err) {
    return;
  }
};

export default populateDb;
