import { Request, Response } from 'express';
import { Op } from 'sequelize';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';
import Blacklist from '../models/blacklist';

const login = async (req: Request, res: Response) => {
  const { emailOrUserName, password } = req.body;
  if (!emailOrUserName || !password) return res.status(403).send({
    status: 'Bad',
    message: 'Include username/email and password'
  });
  const user = await User.findOne({
    where : {
      [Op.or] : [
        { email: emailOrUserName },
        { userName: emailOrUserName }
      ]
    }
  });

  if (!user) return res.status(403).send({
    status: 'Bad',
    message: 'Invalid username/email or password'
  });
  bcrypt.compare(password, user.password, (err, isValid) => {
    if (err) return res.status(500).send({
      status: 'Bad', 
      message: 'Not good very bad', 
      data: err
    });
    
    if (!isValid) return res.status(403).send({
      status: 'Bad',
      message: 'Invalid username/email or password',
    });

    const token = jwt.sign({ userId: user.id }, config.SECRET, { expiresIn: '1800s' });
    res.send({
      status: 'Okay',
      message: 'Enjoy your JWT',
      data: token
    });
  });
};

const logout = async (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).send({
      status: 'Bad',
      message: 'Unauthorized'
    });
  }
  try {
    await Blacklist.create({
      jwt: token
    });
    res.status(200).send({
      status: 'Okay',
      message: 'Logged out'
    });
  } catch (err) {
    res.status(500).send({
      status: 'Bad',
      message: 'Server error when logging out',
      data: err
    });
  }
};

export default {
  login,
  logout,
};
