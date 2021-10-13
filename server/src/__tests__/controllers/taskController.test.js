import express from 'express';
import supertest from 'supertest';
import sequelize from '../../models/index';
import 'regenerator-runtime/runtime';
import User from '../../models/user';
import router from '../../router';
import dbInit from '../../models/init';
import Quest from '../../models/quest';
import Task from '../../models/task';
import TaskHistory from '../../models/taskHistory';
import populateDb from '../../funcs/populatedb';
import Achievement from '../../models/achievement';

describe ('Task Controller', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  
  const request = supertest(app);

  let user;
  let quest;
  let tasks;
  let loginRes;

  beforeAll(async () => {
    await dbInit();
    await populateDb();
    
    user = await User.findOne({
      where: {
        userName: 'timbo'
      }
    });
    quest = await Quest.findOne({
      where: {
        name: 'Mediation crash course'
      }
    }); 
    loginRes = await request.post('/login').send({
      emailOrUserName: 'bigBoy@gmail.com',
      password: 'password123'
    });
    tasks = await quest.getTasks();
  });
  
  afterAll(async () => {
    await sequelize.drop(); 
  });
  
  test('retrieve a quest\'s tasks', async () => {
    const res = await request.get(`/tasks/quest/${quest.id}`);
    expect(res.body.data).toHaveLength(quest.taskCount);
  });
  
  test('complete a task', async () => {
    const res = await request.post(`/tasks/${tasks[0].id}`).set(
      'Authorization',
      `Bearer ${loginRes.body.data}`
    );
    const chieves = await user.getAchievements();
    expect(chieves).toHaveLength(1);
  });
});