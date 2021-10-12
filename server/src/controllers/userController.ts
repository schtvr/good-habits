import User from '../models/user';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import config from '../../config';
import bcrypt from 'bcrypt';
import sendRes from '../funcs/sendRes';

// CHECK FOR PASSWORD LENGTH
// VALIDATE FORM
const createUser = async (req: Request, res:Response) => {
  try {
    const { body } = req;
    const { password, firstName, lastName, userName, email } = req.body;
    if (!body || !password || !firstName || !lastName ||
    !userName || !email) return sendRes(res, false, 403, 'Missing form data');

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) res.sendStatus(500);
      try {
        const user = await User.create({ ...body, password: hash });
        const token = jwt.sign({ userId: user.id }, config.SECRET, { expiresIn: '7d' });
        res.send({
          status: 'Okay',
          message: 'User created',
          token,
          user: userWithoutPassword(user)
        });
      } catch (err) {
        return sendRes(res, false, 400, 'Duplicate username or email');
      }
    });
  } catch (err) {
    return sendRes(res, false, 500, 'Server error creating user', err);
  }
};

const findUserById = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) return sendRes(res, false, 403, 'Unauthorized token');
  try {
    const userInfo = await User.findOne({
      where: {
        id: user.id
      }
    });

    if (!userInfo) return res.status(404).send('No user found with that id');
    return sendRes(res, true, 200, 'Here is the user lol', userWithoutPassword(user));
  } catch (err) {
    return sendRes(res, false, 500, 'Server error finding user', err);
  }
};
const addUserByUserName = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = req.user;
  if (!userId || !user) return sendRes(res, false, 403, 'Did not send userId or Username, or not authenticated');
  try {
    const userToFollow = await User.findOne({
      where: {
        userName: userId
      }
    });
    if  (!userToFollow) return sendRes(res, false, 404, 'No user with that Id or Username');

    //Added because you can friend multiple people at once
    user.addUser([userToFollow.id]);
    return sendRes(res, true, 200, 'User has been added');
  } catch (err) {
    return sendRes(res, false, 500, 'Internal Server Error', err);
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
  findUserById,
  addUserByUserName
};
