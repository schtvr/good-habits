import User from '../models/user';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import config from '../../config';
import bcrypt from 'bcrypt';

const createUser = async (req: Request, res:Response) => {
  try {
    const { password } = req.body;
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) res.sendStatus(500);
      const createdUser = await User.create({...req.body, password: hash});
      const token = jwt.sign(createdUser.id.toString(), config.SECRET, { expiresIn: '1800s' });
      res.send({
        status: 'Okay',
        message: 'Enjoy your JWT',
        token
      });
    });
  } catch (err) {
    res.status(500).send({
      status: 'Bad',
      message: 'Server error creating user',
      error: err
    });
  }
};

const findUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: { id: req.body.userId }
    });

    if (!user) return res.status(404).send('No user found with that id');
    const { password, ...modifedUser } = user;
    res.send({
      status: 'Okay',
      message: 'Here is the user lol',
      modifedUser
    });
  } catch (err) {
    res.status(500).send({
      status: 'Bad',
      message: 'Server error finding user',
      error: err
    });
  }
};

export default {
  createUser,
  findUserById
};
