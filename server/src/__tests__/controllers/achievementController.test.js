import express from 'express';
import supertest from 'supertest';
import sequelize from '../../models/index';
import bcrypt from 'bcrypt';
import 'regenerator-runtime/runtime';
import User from '../../models/user';
import router from '../../router';
import dbInit from '../../models/init';
import Quest from '../../models/quest';
import AchievementTemplate from '../../models/achievementTemplate';

describe('Achievement controller', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  
  const request = supertest(app);
  
  let user;
  let loginRes;
  let template;
  
  beforeAll(async () => {
    await dbInit();
    user = await User.create({
      firstName: 'amog',
      lastName: 'us',
      userName: 'amogus',
      password: bcrypt.hashSync('sussybakka', 10),
      email: 'lookinKindaSus@walt.com'
    });
    loginRes = await request.post('/login').send({
      emailOrUserName: 'amogus',
      password: 'sussybakka'
    }); 
    template = await AchievementTemplate.create({
      description: 'fuck bob 100 times',
      img: '',
      category: 'bob fucking category',
      criteria: 'Fuck bob 100 times',
      completionExp: 200
    });
  });
  
  afterAll(async () => {
    await sequelize.drop();
  });
  
  test('retrieve all achievement templates', async () => {
    const res = await request.get('/achievement/templates');
    const templates = res.body.data;
    expect(templates).toHaveLength(1);
    await AchievementTemplate.create({
      description: 'poo',
      category: 'toilet category',
      completionExp: 1000,
      criteria: 'take a poo',
      img: ''
    });
    const res2 = await request.get('/achievement/templates');
    const templates2 = res2.body.data;
    expect(templates2).toHaveLength(2);
    expect(templates2[1].category).toBe('toilet category');
  });
  
  test('grant user achievement', async () => {
    const res = await request.post(`/achievement/${template.id}`).set(
      'Authorization',
      `Bearer ${loginRes.body.data}`
    );
    
    expect(res.body.status).toBe('Okay');
    expect(res.body.message).toBe('Achievement granted');
    const grantedAchieves = await user.getAchievements();
    expect(grantedAchieves).toHaveLength(1);
  });
  
  test('retrieve user\'s achievements', async () => {
    const res = await request.get('/achievement/').set(
      'Authorization',
      `Bearer ${loginRes.body.data}`
    );
    expect(res.body.data).toHaveLength(1);
  });
  
  test('no double achievements', async () => {
    const res = await request.post(`/achievement/${template.id}`).set(
      'Authorization',
      `Bearer ${loginRes.body.data}`
    );
    expect(res.body.status).toBe('Bad');
    expect(res.body.message).toBe('User already has this achievement');
    const grantedAchieves = await user.getAchievements();
    expect(grantedAchieves).toHaveLength(1);
  });
  
  test('grants user experience', async () => {
    const currUser = await User.findOne({
      where: {
        id: user.id
      }
    });
    const res = await request.post('/achievement/2').set(
      'Authorization',
      `Bearer ${loginRes.body.data}`
    );
    expect(res.body.status).toBe('Okay');
    expect(res.body.data).toBe(currUser.exp + 1000);
    const updatedUser = await User.findOne({
      where: {
        id: user.id
      }
    }); 
    expect(updatedUser.exp).toBe(currUser.exp + 1000);
  });
});