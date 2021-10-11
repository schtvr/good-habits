import { Request, Response } from 'express';
import { Op } from 'sequelize';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';
import Blacklist from '../models/blacklist';

const login = async (req: Request, res: Response) => {
  const user = await User.findOne({
    where : {
      [Op.or] : [
        {email: req.body.email},
        {userName: req.body.userName}
      ]
    }
  });

  if (!user) return res.status(404).send('User with that Username/Email not found.');
  bcrypt.compare(req.body.password, user.password, (err, result) => {
    const token = jwt.sign(user.id.toString(), config.SECRET, { expiresIn: '1800s' });
    res.json(token);
  });
};

const logout = async (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).send('Unauthorized');
  }
  try {
    Blacklist.create({
      jwt: token
    });
    res.status(200).send('Logged out');
  } catch (err) {
    res.status(500).send('Server error when logging out');
  }
};

export default {
  login,
  logout,
};
