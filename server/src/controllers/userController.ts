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
// const addUserByUserName = async (req: Request, res: Response) => {
//   const userId = req.params.userId;
//   const user = req.user;
//   if (!userId || !user) return sendRes(res, false, 403, 'Did not send userId or Username, or not authenticated');
//   try {
//     const userToFollow = await User.findOne({
//       where: {
//         userName: userId
//       }
//     });
//     if  (!userToFollow) return sendRes(res, false, 404, 'No user with that Id or Username');

//     //Added because you can friend multiple people at once
//     user.addUser([userToFollow.id]);
//     return sendRes(res, true, 200, 'User has been added');
//   } catch (err) {
//     return sendRes(res, false, 500, 'Internal Server Error', err);
//   }
// };



// router.put('/user/:id/friendRequest',verify ,user.putFriendRequest);
// router.get('/user/friendRequestReceived', verify ,user.getFriendRequestReceived);
// router.get('/user/friendRequestSent', verify ,user.getFriendRequestSent);
// router.put('/user/:id/acceptFriendRequest', verify ,user.acceptFriendRequest);
// router.get('/user/:id/friends', verify ,user.getFriends);
// router.put('/user/:id/cancelFriendRequest', verify ,user.cancelFriendRequest);
// router.put('/user/:id/unfriend', verify ,user.unfriend);


const putFriendRequest = async (req: Request, res: Response) => {
  const userName = req.params.id;
  const user = req.user;
  if (!userName || !user) return res.status(403).send({
    status: 'Bad',
    message: 'Missing userId or not authenticated',
  });
  try { 
    const userToFriend = await User.findOne({
      where: {
        userName
      }
    });
    if (!userToFriend) return res.status(404).send({
      status: 'Bad',
      message: 'You sent me a user that doesn\'t exist dumdum',
    });

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
    const friendRequests = await user.getRequestees();
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
    const friendRequests = await user.getRequesters();
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
  const userName = req.params.id;
  const user = req.user;
  if (!userName || !user) return res.status(403).send({
    status: 'Bad',
    message: 'Missing userId or not authenticated',
  });
  try { 
    const userToFriend = await User.findOne({
      where: {
        userName
      }
    });
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
    return res.status(200).send({
      status: 'Okay',
      message: 'Friend request accepted'
    });
  } catch (err) {
    res.status(500).send({
      status: 'Bad',
      message: 'Internal Server Error',
      data: err,
    }); 
  }
};
const getFriends = async (req: Request, res: Response) => {
};

const cancelFriendRequest = async (req: Request, res: Response) => {
};

const unfriend = async (req: Request, res: Response) => {
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
};
