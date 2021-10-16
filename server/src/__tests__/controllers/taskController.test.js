import express from 'express';
import supertest from 'supertest';
import sequelize from '../../models/index';
import 'regenerator-runtime/runtime';
import User from '../../models/user';
import router from '../../router';
import dbInit from '../../models/init';
import Quest from '../../models/quest';
import TaskHistory from '../../models/taskHistory';
import populateDb from '../../funcs/populateDb/populatedb';

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
    const res = await request.get(`/task/quest/${quest.id}`);
    expect(res.body.data).toHaveLength(quest.taskCount);
  });
  
  test('completed tasks', async () => {
    for await (const task of tasks) {
      const res = await request.post(`/task/${task.id}`).set(
        'Authorization',
        `Bearer ${loginRes.body.data}`
      );
      expect(res.body.status).toBe('Okay');
      expect(res.body.data.tasks[0].id).toBe(task.id);
      if (task.id === 1) {
        expect(res.body.data.achievements).toHaveLength(1);
        expect(res.body.data.achievements[0].name).toBe('Task noob');
        expect(res.body.data.gainedExp).toBe(task.completionExp + 100);
      } else if (task.id === 5) {
        expect(res.body.data.achievements).toHaveLength(1);
        expect(res.body.data.achievements[0].name).toBe('Task starter');
        expect(res.body.data.gainedExp).toBe(task.completionExp + 600);
      } else {
        expect(res.body.data.gainedExp).toBe(task.completionExp);
      }
    }
  });
  
  test('only complete a task once', async () => {
    const res = await request.post(`/task/${tasks[0].id}`).set(
      'Authorization',
      `Bearer ${loginRes.body.data}`
    );
    expect(res.body.status).toBe('Bad');
    const history = await TaskHistory.findAll();
    expect(history).toHaveLength(5);
  });
  
  test('retrieve a user\'s task history', async () => {
    const res = await request.get('/task').set(
      'Authorization',
      `Bearer ${loginRes.body.data}`
    );
    expect(res.body.status).toBe('Okay');
    expect(res.body.data[0].taskId).toBe(tasks[0].id);
  });
  
  test('retrieve a task by id', async () => {
    const res = await request.get(`/task/${tasks[2].id}`);
    const body = res.body;
    expect(body.status).toBe('Okay');
    expect(body.data.id).toBe(tasks[2].id);
    const res2 = await request.get('/task/100000'); 
    expect(res2.body.status).toBe('Bad');
    expect(res2.body.message).toBe('No task found with that id');
  });
});