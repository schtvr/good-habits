import User from '../models/user';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import config from '../../config';
import bcrypt from 'bcrypt';
import sendRes from '../funcs/sendRes';
import stripPassword from '../funcs/stripPassword';
import userAttributes from '../util/userAttributes';
import { createUpdate } from '../interfaces/Update';
import checkAchievements from '../funcs/checkAchievements';

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
          user: stripPassword(user)
        });
      } catch (err) {
        return sendRes(res, false, 400, 'Duplicate username or email');
      }
    });
  } catch (err) {
    return sendRes(res, false, 500, 'Server error creating user', err);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) return sendRes(res, false, 403, 'Unauthorized token');
  try {
    const users = await User.findAll(userAttributes);
    return sendRes(res, true, 200, 'Enjoy your data lol', users);
  } catch (err) {
    return sendRes(res, false, 500, 'internal server error', err);
  }
};

const getYourInfo = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) return sendRes(res, false, 403, 'Unauthorized token');
  try {
    return sendRes(res, true, 200, 'Here is the user lol', stripPassword(user));
  } catch (err) {
    return sendRes(res, false, 500, 'Server error finding user', err);
  }
};

const findUserById = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  if (!userId) return res.status(403).send({
    status: 'Bad',
    message: 'Missing userId or not authenticated',
  });
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId
      },
      attributes : {
        include: ['id', 'userName', 'level', 'exp'],
        exclude: [
          'password',
          'email',
          'firstName',
          'lastName',
        ]
      }
    });

    return sendRes(res, true, 200, 'Here is the user lol', user);
  } catch (err) {
    return sendRes(res, false, 500, 'Not suprised this errored', err);
  }
};

const putFriendRequest = async (req: Request, res: Response) => {
  const friendId = req.params.id;
  const user = req.user;
  if (!friendId || !user) return res.status(403).send({
    status: 'Bad',
    message: 'Missing userId or not authenticated',
  });

  try { 
    const userToFriend = await User.findByPk(friendId);

    if (!userToFriend) return res.status(404).send({
      status: 'Bad',
      message: 'You sent me a user that doesn\'t exist dumdum',
    });
    if (userToFriend.id === user.id) return sendRes(res, false, 403, 'You sent a friend request to yourself. why?');
    
    await userToFriend.addRequestees(user.id);
    return res.status(200).send({
      status: 'Okay',
      message: 'Friend request sent'
    });
  } catch (err) {
    res.status(500).send({
      status: 'Bad',
      message: 'Internal Server Error',
      data: err,
    });
  }
};

const getFriendRequestReceived = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) return res.status(403).send({
    status: 'Bad',
    message: 'Not authenticated',
  });
  try {
    const friendRequests = await user.getRequestees(userAttributes);
    return res.status(200).send({
      status: 'Okay',
      message: 'Enjoy your friend requests loser',
      data: friendRequests,
    });
  } catch (err) {
    res.status(500).send({
      status: 'Bad',
      message: 'Internal Server Error',
      data: err,
    });
  }
};

const getFriendRequestSent = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) return res.status(403).send({
    status: 'Bad',
    message: 'Not authenticated',
  });
  try {
    const friendRequests = await user.getRequesters(userAttributes);
    return res.status(200).send({
      status: 'Okay',
      message: 'Enjoy your friend requests loser',
      data: friendRequests,
    });
  } catch (err) {
    res.status(500).send({
      status: 'Bad',
      message: 'Internal Server Error',
      data: err,
    });
  }
};

const acceptFriendRequest = async (req: Request, res: Response) => {
  const friendId = req.params.id;
  const user = req.user;
  if (!friendId || !user) return res.status(403).send({
    status: 'Bad',
    message: 'Missing userId or not authenticated',
  });

  try { 
    const userToFriend = await User.findByPk(friendId);
    if (!userToFriend) return res.status(404).send({
      status: 'Bad',
      message: 'You sent me a user that doesn\'t exist dumdum',
    });

    const checkFriendRequests = await user.hasRequestee(userToFriend.id);
    if (!checkFriendRequests) return res.status(404).send({
      status: 'Bad',
      message: 'BaBaBOi they didn\'t even send a friend request',
    });
    await user.removeRequestee([userToFriend.id]);
    await user.addFriends(userToFriend.id);
    await userToFriend.addFriends(user.id);

    const update = createUpdate();
    await checkAchievements(user, 'Social', update);
    await checkAchievements(userToFriend, 'Social', createUpdate());

    return sendRes(res, true, 200, 'Friend request accepted', update);
  } catch (err) {
    res.status(500).send({
      status: 'Bad',
      message: 'Internal Server Error',
      data: err,
    });
  }
};
const getFriends = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) return res.status(403).send({
    status: 'Bad',
    message: 'Not authenticated',
  });
  try {
    const friends = await user.getFriends(userAttributes);
    return res.status(200).send({
      status: 'Okay',
      message: 'Enjoy your friends loser',
      data: friends,
    });
  } catch (err) {
    res.status(500).send({
      status: 'Bad',
      message: 'Internal Server Error',
      data: err,
    });
  }
};

const cancelFriendRequest = async (req: Request, res: Response) => {
  const user = req.user;
  const friendId = req.params.id;
  if (!user || !friendId) return res.status(403).send({
    status: 'Bad',
    message: 'Not authenticated',
  });
  try { 
    const userToCancel = await User.findByPk(friendId);

    if (!userToCancel) return res.status(404).send({
      status: 'Bad',
      message: 'That user does not exist'
    });
    const friendRequests = await user.hasRequester(userToCancel.id);

    if (!friendRequests) return res.status(404).send({
      status: 'Bad',
      message: 'No friend request to that username'
    });
    await user.removeRequester([userToCancel.id]);
    return res.status(200).send({
      status: 'Okay',
      message: 'Friend Request Canceled',
    });
  } catch (err) {
    res.status(500).send({
      status: 'Bad',
      message: 'Internal Server Error',
      data: err,
    });
  }
};

const unfriend = async (req: Request, res: Response) => {
  const friendId = req.params.id;
  const user = req.user;
  if (!friendId || !user) return res.status(403).send({
    status: 'Bad',
    message: 'Missing userId or not authenticated',
  });

  try { 
    const userToUnFriend = await User.findByPk(friendId);

    if (!userToUnFriend) return res.status(404).send({
      status: 'Bad',
      message: 'You sent me a user that doesn\'t exist dumdum',
    });

    const checkFriend = await user.hasFriend(userToUnFriend.id);
    if (!checkFriend) return res.status(404).send({
      status: 'Bad',
      message: 'BaBaBOi they don\'t have that person as friend',
    });
    await user.removeFriend([userToUnFriend.id]);
    return res.status(200).send({
      status: 'Okay',
      message: 'Friendship ended with user hahahah'
    });
  } catch (err) {
    res.status(500).send({
      status: 'Bad',
      message: 'Internal Server Error',
      data: err,
    });
  }
};

export default {
  createUser,
  findUserById,
  acceptFriendRequest,
  cancelFriendRequest,
  unfriend,
  getFriendRequestReceived,
  getFriendRequestSent,
  putFriendRequest,
  getFriends,
  getAllUsers,
  getYourInfo
};