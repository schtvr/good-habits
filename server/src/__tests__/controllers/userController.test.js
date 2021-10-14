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
import populateDb from '../../funcs/populateDb/populatedb';

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
    await populateDb();
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
    test('Should be able to send friend request', async () => {
      const token = jwt.sign({ userId: user.id }, config.SECRET, {
        expiresIn: '7d'
      });
      const res = await request.put(`/user/${dummyUser2.userName}/friendRequest`).set(
        'Authorization',
        `Bearer ${token}`
      );
      expect(res.body.status).toBe('Okay');
      expect(res.body.message).toBe('Friend request sent');
    });
    test('Should fail to send request if user doesn\'t exist', async () => {
      const token = jwt.sign({ userId: user.id }, config.SECRET, {
        expiresIn: '7d'
      });
      const res = await request.put('/user/ijhdfsjhifdsuhdsfhuyguydfsujhikyerdsfiujofedsiukjh/friendRequest').set(
        'Authorization',
        `Bearer ${token}`
      );
      expect(res.body.status).toBe('Bad');
      expect(res.body.message).toBe('You sent me a user that doesn\'t exist dumdum');
    });
    test('Should be able to cancel friend request that exists', async () => {
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
      expect(res2.body.status).toBe('Okay');
      expect(res2.body.message).toBe('Enjoy your friend requests loser');
      const res3 = await request.put(`/user/${res2.body['data'][0]['userName']}/cancelFriendRequest`).set(
        'Authorization',
        `Bearer ${token2}`
      );
      expect(res3.body.status).toBe('Bad');
      expect(res3.body.message).toBe('No friend request to that username');
      const res4 = await request.get('/user/friends').set(
        'Authorization',
        `Bearer ${token2}`
      );
      const res5 = await request.get('/user/friends').set(
        'Authorization',
        `Bearer ${token}`
      );
      expect(res4.body.data[0]?.userName).toBe(undefined);
      expect(res5.body.data[0]?.userName).toBe(undefined);
    });
    test('Should be not be able to cancel friend request that doesn\'t exist', async () => {
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
      expect(res2.body.status).toBe('Okay');
      expect(res2.body.message).toBe('Enjoy your friend requests loser');
      const res3 = await request.put(`/user/${res2.body['data'][0]['userName']}/cancelFriendRequest`).set(
        'Authorization',
        `Bearer ${token2}`
      );
      expect(res3.body.status).toBe('Bad');
      expect(res3.body.message).toBe('No friend request to that username');
      const res4 = await request.get('/user/friends').set(
        'Authorization',
        `Bearer ${token2}`
      );
      const res5 = await request.get('/user/friends').set(
        'Authorization',
        `Bearer ${token}`
      );
      expect(res4.body.data[0]?.userName).toBe(undefined);
      expect(res5.body.data[0]?.userName).toBe(undefined);
    });

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
      expect(res2.body.status).toBe('Okay');
      expect(res2.body.message).toBe('Enjoy your friend requests loser');

      const res3 = await request.put(`/user/${res2.body['data'][0]['userName']}/acceptFriendRequest`).set(
        'Authorization',
        `Bearer ${token2}`
      );
      expect(res3.body.status).toBe('Okay');
      expect(res3.body.message).toBe('Friend request accepted');

      const res4 = await request.get('/user/friends').set(
        'Authorization',
        `Bearer ${token2}`
      );
      const res5 = await request.get('/user/friends').set(
        'Authorization',
        `Bearer ${token}`
      );
      expect(res4.body.data[0]?.userName).toBe(dummyUser.userName);
      expect(res5.body.data[0]?.userName).toBe(dummyUser2.userName);
    });
  });
});