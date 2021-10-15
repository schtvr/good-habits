import { Request, Response } from 'express';
import { Op } from 'sequelize';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';
import Blacklist from '../models/blacklist';
import sendRes from '../funcs/sendRes';

const login = async (req: Request, res: Response) => {
  const { emailOrUserName, password } = req.body;
  if (!emailOrUserName || !password) return sendRes(res, false, 403, 'Include username/email and password');
  const user = await User.findOne({
    where : {
      [Op.or] : [
        { email: emailOrUserName },
        { userName: emailOrUserName }
      ]
    }
  });

  if (!user) return sendRes(res, false, 403, 'Invalid username/email or password');
  bcrypt.compare(password, user.password, (err, isValid) => {
    if (err) return sendRes(res, false, 500, 'Not good very bad', err);
    if (!isValid) return sendRes(res, false, 403, 'Invalid username/email or password');

    const token = jwt.sign({ userId: user.id }, config.SECRET, { expiresIn: '1800s' });
    return sendRes(res, true, 200, 'Enjoy your JWT', token);
  });
};

const logout = async (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return sendRes(res, false, 403, 'Unauthorized'); 
  try {
    await Blacklist.create({
      jwt: token
    });
    return sendRes(res, true, 200, 'Logged out');
  } catch (err) {
    return sendRes(res, false, 500, 'Server error when logging out', err);
  }
};

export default {
  login,
  logout,
};
