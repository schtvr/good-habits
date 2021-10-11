import User from '../models/user';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import config from '../../config';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';


const createUser = async (req: Request, res:Response) => {
  const { password } = req.body;
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) res.sendStatus(500);
    const createdUser = await User.create({...req.body, password: hash});
    const token = jwt.sign(createdUser.id.toString(), config.SECRET, { expiresIn: '1800s' });
    res.json(token);
  });
};

const loginUser = async (req: Request, res:Response) => {
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

const findUserById = async (req: Request, res: Response) => {
  const user = await User.findOne({
    where: { id: req.body.userId }
  });

  if (!user) return res.status(404).send('No user found with that id');
  const { password, ...modifedUser } = user;
  res.json(modifedUser);
};

export default {
  createUser,
  loginUser,
  findUserById
};
