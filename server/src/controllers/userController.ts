import User from '../models/user';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import config from '../../config';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
// CHECK FOR PASSWORD LENGTH
// VALIDATE FORM
const createUser = async (req: Request, res:Response) => {
  try {
    const { body } = req;
    if (!body || !body.password || !body.firstName || !body.lastName ||
    !body.userName || !body.email) return res.status(403).send({
      status: 'Bad',
      message: 'Missing form data'
    });
    const { password } = req.body;
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) res.sendStatus(500);
      try {
        const user = await User.create({ ...req.body, password: hash });
        const token = jwt.sign({ userId: user.id }, config.SECRET, { expiresIn: '7d' });
        res.send({
          status: 'Okay',
          message: 'User created',
          token,
          user: userWithoutPassword(user)
        });
      } catch (err) {
        return res.status(400).send({
          status: 'Bad',
          message: 'Duplicate username or email'
        });
      }
    });
  } catch (err) {
    res.status(500).send({
      status: 'Bad',
      message: 'Server error creating user',
      data: err
    });
  }
};

const findUserById = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) return res.status(403).send('Unauthorized token');
  try {
    const userInfo = await User.findOne({
      where: {
        id: user.id
      }
    });

    if (!userInfo) return res.status(404).send('No user found with that id');
    res.send({
      status: 'Okay',
      message: 'Here is the user lol',
      user: userWithoutPassword(userInfo)
    });
  } catch (err) {
    res.status(500).send({
      status: 'Bad',
      message: 'Server error finding user',
      data: err
    });
  }
};

const addUserByIdOrUserName = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = req.user;
  if (!userId || !user) return res.status(403).send({
    status: 'Bad',
    message: 'Did not send userId or Username, or not authenticated',
  });
  try {
    const userToFollow = await User.findOne({
      where: {
        [Op.or] : [
          { id: userId},
          { userName: userId }
        ]
      }
    });
    if  (!userToFollow) return res.status(404).send({
      status: 'Bad',
      message: 'No user with that Id or Username',
    });
    //Added because you can friend multiple people at once
    user.addUser([userToFollow.id]);
    return res.status(200).send({
      status: 'Okay',
      message: 'User has been added',
    });
  } catch (err) {
    return res.status(500).send({
      status: 'Bad',
      message: 'Internal Server Error',
      data: err,
    });
  }

};


const userWithoutPassword = (user: User) => {
  return {
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  };
};

export default {
  createUser,
  findUserById
};
