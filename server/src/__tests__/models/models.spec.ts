import dbInit from '../../models/init';
import User from '../../models/user';
import AchievementTemplate from '../../models/achievementTemplate';
import Achievement from '../../models/achievement';
import sequelize from '../../models/index';
import Quest from '../../models/quest';
import Task from '../../models/task';
import TaskHistory from '../../models/taskHistory';
describe('Tests for the models', () => {
  beforeAll(async () => {
    await dbInit();
  });

  afterAll(async () => {
    await sequelize.drop();
  });

  let user: User;
  let achieveTemplate: AchievementTemplate;
  let achieve: Achievement;
  let quest: Quest;
  let task: Task;

  beforeEach(async () => {
    user = await User.create({
      firstName: 'fuck',
      lastName: 'bob',
      userName: 'fuckbob',
      email: 'fuckbob.com',
      password: 'password',
    });
    achieveTemplate = await AchievementTemplate.create({
      name: 'fuck',
      description: 'fuck',
      img: 'idc',
      category: 'idk',
      criteria: 100,
      completionExp: 100
    });
    achieve = await Achievement.create({
      userId: user.id,
      templateId: achieveTemplate.id,
    });
    quest = await Quest.create({
      duration: 10,
      name: 'big shit test',
      description: 'poo on bob 100 times',
      category: 'poo category',
      completionExp: 10000,
      taskCount: 1
    });
    task = await Task.create({
      questId: quest.id,
      name: 'big poo time',
      description: 'poo on bob',
      completionExp: 10,
      index: 1,
      day: 0
    });
  });

  afterEach(async () => {
    await User.destroy({
      where: {},
    });
  });

  describe('User', () => {
    test('name on user should match input name', async () => {
      expect(user.firstName).toBe('fuck');
      expect(user.lastName).toBe('bob');
      expect(user.userName).toBe('fuckbob');
      expect(user.email).toBe('fuckbob.com');
      expect(user.password).toBe('password');
    });

    test('Should not be able create users with duplicate emails or usernames', async () => {
      try {
        await User.create({
          firstName: 'fuck',
          lastName: 'bob',
          userName: 'fuckbob',
          email: 'fuck2bobs.com',
          password: 'password',
        });
        expect(true).toBe(false);
      } catch (err) {
        const bobs = await User.findAll({
          where: {
            userName: 'fuckbob',
          },
        });
        expect(bobs).toHaveLength(1);
      }
      try {
        await User.create({
          firstName: 'fuck',
          lastName: 'bob',
          userName: 'fuck2bobs',
          email: 'fuckbob.com',
          password: 'password',
        });
        expect(true).toBe(false);
      } catch (err) {
        const bobs2 = await User.findAll({
          where: {
            email: 'fuckbob.com',
          },
        });
        expect(bobs2).toHaveLength(1);
      }
    });


    test('Should be able to add friend', async () => {
      const thing1 = await User.create({
        firstName: 'thing',
        lastName: '1',
        userName: 'thing1',
        email: 'thing1.com',
        password: 'password',
      });
      const thing2 = await User.create({
        firstName: 'thing',
        lastName: '2',
        userName: 'thing2',
        email: 'thing2.com',
        password: 'password',
      });

      await thing1.addRequestees(thing2.id);
      expect(await thing1.countRequestees()).toBe(1);
      expect(await thing2.hasRequester(thing1.id)).toBe(true);
      expect(await thing1.hasRequestee(thing2.id)).toBe(true);
      expect(await thing1.countFriends()).toBe(0);
      await thing1.addFriends(thing2.id);
      await thing1.removeRequestee([thing2.id]);
      expect(await thing2.hasRequester(thing1.id)).toBe(false);
      expect(await thing1.hasRequestee(thing2.id)).toBe(false);
      expect(await thing1.countFriends()).toBe(1);
      expect(await thing1.countRequestees()).toBe(0);
    });
  });

  describe('Quest', () => {
    test('should create a quest', async () => {
      expect(quest.duration).toBe(10);
      expect(quest.name).toBe('big shit test');
      expect(quest.description).toBe('poo on bob 100 times');
      expect(quest.category).toBe('poo category');
      expect(quest.completionExp).toBe(10000);
    });

    test('should have task association', async () => {
      const questsTasks = await quest.getTasks();
      expect(questsTasks).toHaveLength(1);
    });

    test('able to create tasks', async () => {
      await quest.createTask({
        name: 'pupper',
        description: 'make a new task',
        completionExp: 100,
        index: 2,
        day: 0
      });
      const questsTasks = await quest.getTasks();
      expect(questsTasks).toHaveLength(2);
    });
    
    test('able to add active quests to users', async () => {
      await quest.createActiveQuest({
        userId: user.id,
      });
      let userQuests = await user.getActiveQuests();
      expect(userQuests).toHaveLength(1);

      const newQuest = await Quest.create({
        duration: 10,
        name: 'big shit test',
        description: 'poo on bob 100 times',
        category: 'poopoo category',
        completionExp: 10000,
        taskCount: 5
      });
      await newQuest.createActiveQuest({
        userId: user.id
      });
      userQuests = await user.getActiveQuests();
      expect(userQuests).toHaveLength(2);
    });
    
    test('no duplicate quests', async () => {
      try {
        await quest.createActiveQuest({
          userId: user.id,
        }); 
        await quest.createActiveQuest({
          userId: user.id,
        }); 
      } catch (err) {
        const userQuests = await user.getActiveQuests();
        expect(userQuests).toHaveLength(1);
      }
    });
  });
  
  describe('Achievements', () => {
    test('Achievement creation should be possible', async () => {
      expect(achieveTemplate.description).toBe('fuck');
      expect(achieveTemplate.img).toBe('idc');
      expect(achieveTemplate.category).toBe('idk');
      expect(achieveTemplate.criteria).not.toBe('fuck bob 45445588748 times');
      expect(await achieveTemplate.getAchievements()).toHaveLength(1);
    });
    
    test('AchievementTemplate should grant users achievements', async () => {
      const bigChieve = await AchievementTemplate.create({
        name: 'fuck2',
        description: 'fuck2',
        img: 'idc2',
        category: 'idk2',
        criteria: 200,
        completionExp: 100
      });
      await bigChieve.createAchievement({
        userId: user.id
      });
      expect(await user.getAchievements()).toHaveLength(2);
    });
    
    test('no duplicate achievements', async () => {
      try {
        await achieveTemplate.createAchievement({
          userId: user.id,
        });
        await achieveTemplate.createAchievement({
          userId: user.id,
        });
      } catch (err) {
        const userAchievements = await user.getAchievements();
        expect(userAchievements).toHaveLength(1);
      }
    });
  });

  describe('Tasks', () => {
    test('able to add active tasks to users', async () => {
      await task.createTaskHistory({
        userId: user.id,
        questId: task.questId
      });
      const userTasks = await user.getTaskHistory();
      expect(userTasks).toHaveLength(1);
    });
    
    test('should not allow duplicate tasks', async () => {
      try {
        await task.createTaskHistory({
          userId: user.id,
          questId: task.questId
        });
        await task.createTaskHistory({
          userId: user.id,
          questId: task.questId
        });
      } catch (err) {
        const userTasks = await user.getTaskHistory();
        expect(userTasks).toHaveLength(1);
      }
    });
    
    test('should be able to mark tasks completed', async () => {
      const taskHistory = await task.createTaskHistory({
        userId: user.id,
        questId: task.questId
      });
      
      await taskHistory.complete();
      expect(taskHistory.completed).toBe(true);
      const dbTaskHistory = await TaskHistory.findOne({ where: { id: taskHistory.id }});
      expect(dbTaskHistory?.completed).toBe(true);
    });
  });
});
