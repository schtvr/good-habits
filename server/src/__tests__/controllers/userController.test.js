import express from 'express';
import supertest from 'supertest';
import sequelize from '../../models/index';
import bcrypt from 'bcrypt';
import 'regenerator-runtime/runtime';
import jwt from 'jsonwebtoken';
import router from '../../router';
import dbInit from '../../models/init';
import User from '../../models/user';
import config from '../../../config';

describe('User controller', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  
  const request = supertest(app);
  const dummyUser = {
    firstName: 'Bob',
    lastName: 'Fucko',
    userName: 'fuckoBob',
    password: bcrypt.hashSync('bigshitter123', 10),
    email: 'fuckoBob123@fuckbob.com'
  };
  const dummyUser2 = {
    firstName: 'thingsadas',
    lastName: 'lol',
    userName: 'HAHAHAHAH',
    password: bcrypt.hashSync('shitcringepassword', 10),
    email: 'HAHAHAHAH@fuckbob.com'
  };
  
  let user;
  let otherUser;
  
  beforeAll(async () => {
    await dbInit();
    user = await User.create(dummyUser);
    otherUser = await User.create(dummyUser2);
  });
  
  afterAll(async () => {
    await User.destroy({
      where: {}
    });
    await sequelize.drop();
  });
  
  describe('Create user', () => {
  
    test('create user', async () => {
      const res = await request.post('/user').send({
        firstName: 'Steve',
        lastName: 'Biggly',
        userName: 'SteveIsOld',
        password: 'iWillBeDeadSoon',
        email: 'GrandpasRUs@grandpa.com'
      });
      const { body } = res;
      expect(body.status).toBe('Okay');
      expect(body.message).toBe('User created');
      expect(body.token).not.toBe(undefined);
      expect(body.user.userName).toBe('SteveIsOld');
      expect(body.user.password).toBe(undefined);
    });
  
    test('reject duplicate email and username', async () => {
      const res = await request.post('/user')
        .send(dummyUser);
      expect(res.body.status).toBe('Bad');
      expect(res.body.message).toBe('Duplicate username or email');
    });
  
    test('rejects forms with missing fields', async () => {
      const res = await request.post('/user')
        .send({
          firstName: 'poo',
          email: 'dummy',
          passwordl: 'ihatejavascript'
        });
      expect(res.body.status).toBe('Bad');
      expect(res.body.message).toBe('Missing form data');
    });
  });

  describe('Find user by Id', () => {
    test('finds valid users by id', async () => {
      const token = jwt.sign({ userId: user.id }, config.SECRET, {
        expiresIn: '7d'
      });
      const res = await request.get('/user/').set(
        'Authorization',
        `Bearer ${token}`
      );
      const { body } = res;
      expect(body.status).toBe('Okay');
      expect(body.data.userName).toBe('fuckoBob');
      expect(body.data.password).toBe(undefined);
      expect(body.data.email).toBe('fuckoBob123@fuckbob.com');
    });
  });

  describe('Friends List functionality', () => {
    test('Should be able to add as friend', async () => {
      const token = jwt.sign({ userId: user.id }, config.SECRET, {
        expiresIn: '7d'
      });
      const token2 = jwt.sign({ userId: otherUser.id }, config.SECRET, {
        expiresIn: '7d'
      });
      const res = await request.put(`/user/${dummyUser2.userName}/friendRequest`).set(
        'Authorization',
        `Bearer ${token}`
      );
      expect(res.body.status).toBe('Okay');
      expect(res.body.message).toBe('Friend request sent');
      const res2 = await request.get('/user/friendRequestReceived').set(
        'Authorization',
        `Bearer ${token2}`
      );
      //console.log(res2.body);

    });
  });
});