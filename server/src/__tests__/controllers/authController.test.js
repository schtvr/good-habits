import express from 'express';
import supertest from 'supertest';
import sequelize from '../../models/index';
import bcrypt from 'bcrypt';
import 'regenerator-runtime/runtime';
import jwt, { JwtPayload } from 'jsonwebtoken';

import router from '../../router';
import dbInit from '../../models/init';
import User from '../../models/user';
import config from '../../../config';
import Blacklist from '../../models/blacklist';

describe ('Auth controller', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  
  const request = supertest(app);
  
  beforeAll(async () => {
    await dbInit();
    await User.create({
      firstName: 'Bob',
      lastName: 'Fucko',
      userName: 'fuckoBob',
      password: bcrypt.hashSync('bigshitter123', 10),
      email: 'fuckoBob123@fuckbob.com'
    });
  });
  
  afterAll(async () => {
    await User.destroy({
      where: {}
    });
    await sequelize.drop();
  });
  
  describe('Login', () => {
    test('sign in valid users', async () => {
      const res = await request.post('/login').send({
        emailOrUserName: 'fuckoBob',
        password: 'bigshitter123'
      });
      expect(res.body.status).toBe('Okay');
      const isValid = await validateToken(res.body.data);
      expect(isValid).toBe(true);
    });
    
    test('REJECT invalid passwords', async () => {
      const res = await request.post('/login').send({
        emailOrUserName: 'fuckoBob',
        password: 'i dont fuck bob'
      });
      expect(res.body.status).toBe('Bad');
      expect(res.body.token).toBe(undefined);
      expect(res.body.message).toBe('Invalid username/email or password');
    });
    
    test('rejects invalid username or email', async () => {
      const res = await request.post('/login').send({
        emailOrUserName: 'this user does not exist',
        password: 'bigshitter123'
      });
      
      expect(res.body.status).toBe('Bad');
      expect(res.body.message).toBe('Invalid username/email or password');
      expect(res.body.token).toBe(undefined);
    });
    
    test('should reject requests with missing fields', async () => {
      const res = await request.post('/login').send({
        password: 'bigshitter123'
      });
      expect(res.body.status).toBe('Bad');
      expect(res.body.message).toBe('Include username/email and password');

      const res2 = await request.post('/login').send({
        emailOrUserName: 'bigshitter123'
      });
      expect(res2.body.status).toBe('Bad');
      expect(res2.body.message).toBe('Include username/email and password');
    });
  });
  
  describe('Logout', () => {
    test('should add JWT to blacklist upon logout', async () => {
      const loginRes = await request.post('/login').send({
        emailOrUserName: 'fuckoBob',
        password: 'bigshitter123'
      }); 
      const res = await request.post('/logout').set(
        'Authorization',
        `Bearer ${loginRes.body.data}`
      );
      expect(res.body.status).toBe('Okay');
      expect(res.body.message).toBe('Logged out');
      const blacklist = await Blacklist.findOne({
        where: {
          jwt: loginRes.body.data
        }
      });
      expect(blacklist.jwt).toBe(loginRes.body.data);
    });
    
    test('blacklisted tokens should not authenticate', async () => {
      const testJwt = jwt.sign({ userId: 1 }, config.SECRET, { expiresIn: '2d' });
      await request.post('/logout').set(
        'Authorization',
        `Bearer ${testJwt}`
      );
      const res = await request.post('/logout').set(
        'Authorization',
        `Bearer ${testJwt}`
      ); 
      expect(res.body.status).toBe('Bad');
      expect(res.body.message).toBe('Unauthorized JWT');
    });
    
    test('should reject malformed JWT', async () => {
      const res = await request.post('/logout').set(
        'Authorization',
        'Bearer bigdumdumpoohead'
      ); 
      expect(res.body.status).toBe('Bad');
      expect(res.body.message).toBe('WTF kind of jwt is that???');
    });
    
    test('handles requests with no auth headers', async () => {
      const res = await request.post('/logout');
      expect(res.body.status).toBe('Bad');
      expect(res.body.message).toBe('You did not send me a token dumdum');
    });
  });
});

const validateToken = async (token) => {
  try {
    jwt.verify(token, config.SECRET);
    return true;
  } catch (err) {
    return false;
  }
};