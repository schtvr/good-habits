import { Request, Response } from 'express';
import sendRes from '../funcs/sendRes';
import User from '../models/user';

const getAllRankings = async (req: Request, res: Response) => {
  try {
    const rankings = await User.findAll({
      attributes: {
        include: ['id', 'userName', 'exp', 'level'],
        exclude: [ 'password', 'email', 'firstName', 'lastName']
      },
      order: [['exp', 'desc']],
      limit: 25
    });
    sendRes(res, true, 200, 'Ranking retrieved', rankings);
  } catch (err) {
    sendRes(res, false, 500, 'Server error getting leaderboards', err);
  }
};

const getFriendRankings = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) return sendRes(res, false, 403, 'Not a valid user');
  try { 
    const friendRankings = await user.getFriends({
      attributes: {
        include: ['id', 'userName', 'exp', 'level'],
        exclude: [ 'password', 'email', 'firstName', 'lastName']
      },
      order: [['exp', 'desc']],
      limit: 25
    });
    sendRes(res, true, 200, 'Friend rankings retrieved', friendRankings);
  } catch (err) {
    sendRes(res, false, 500, 'Server error getting leaderboards', err); 
  }
};

export default {
  getAllRankings,
  getFriendRankings
};