import dbInit from '../models/init';
import User from '../models/user';
import AchievementTemplate from '../models/achievementTemplate';
import Achievement from '../models/achievement';
import sequelize from '../models/index';
describe('Tests for the models', () => {
  
  beforeAll(async () => {
    await dbInit();
  });
  
  afterAll(async () => {
    sequelize.drop();
  });

  test('name on user should match input name', async () => {
    const newUser = await User.create({
           firstName: 'fuck',
           lastName: 'bob',
           userName: 'fuckbob',
           email: 'fuckbob.com',
           password: 'password',
         });
    expect(newUser.firstName).toBe('fuck');
    expect(newUser.lastName).toBe('bob');
    expect(newUser.userName).toBe('fuckbob');
    expect(newUser.email).toBe('fuckbob.com');
    expect(newUser.password).toBe('password');
  });

  test('Achievement creation should be possible', async () => {
    const template = await AchievementTemplate.create({
      description: 'fuck',
      img: 'idc',
      category: 'idk',
      criteria: 'fuck bob 100 times'
    });
    expect(template.description).toBe('fuck');
    expect(template.img).toBe('idc');
    expect(template.category).toBe('idk');
    expect(template.criteria).not.toBe('fuck bob 45445588748 times');
    const achieve = await Achievement.create({
      userId: 1,
      achievementId: 1,
    });
    expect(await template.getAchievements()).toHaveLength(1);
    
  });
  test('Active quests should work')
});
