import createAchievements from './createAchievements';
import createUsers from './createUsers';
import createQuests from './createQuests';

const populateDb = async () => {
  try {
    await createQuests();
    await createAchievements();
    await createUsers();
    
  } catch (err) {
    return;
  }
};

export default populateDb;
