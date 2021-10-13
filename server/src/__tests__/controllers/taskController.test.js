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
import AchievementTemplate from '../../models/achievementTemplate';

describe ('Task Controller', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  
  const request = supertest(app);
  
  test('retrieve a quest\'s tasks', async () => {

  });
});