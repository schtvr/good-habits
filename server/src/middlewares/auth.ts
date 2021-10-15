import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { Request, Response, NextFunction, Express} from 'express';
import User from '../models/user';
import Blacklist from '../models/blacklist';

const verify = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).send({
      status: 'Bad',
      message: 'You did not send me a token dumdum'
    });
  }
  const isBlacklisted: Blacklist | null = await Blacklist.findOne({
    where: {
      jwt: token
    }
  });
  
  if (isBlacklisted) {
    return res.status(403).send({
      status: 'Bad',
      message: 'Unauthorized JWT'
    });
  }
  
  jwt.verify(token, config.SECRET, async (err: any, payload: JwtPayload | undefined) => {
    if (err) return res.status(403).send({
      status: 'Bad',
      message: 'WTF kind of jwt is that???'
    });
    if (!payload || !payload.userId) return res.status(403).send({
      status: 'Bad',
      message:'Was not passed userId'
    });
    const { userId } = payload;
    const user: User | null = await User.findOne({
      where: { id: userId }
    });
    if (!user) return res.status(404).send({
      status: 'Bad',
      message: 'User not found'
    });
    req.user = user;
    try {
      const gottenToken = await user.getFirebaseTokens();
      if (!gottenToken) {
        if (!req.body.firebaseId) return res.status(404).send({
          status: 'Bad',
          message: 'You need to send the firebaseId in body'
        });
        await user.createFirebaseTokens({firebaseId: req.body.firebaseId});
      } 
    } catch (err) {
      console.log(err);
    }
    
    return next();
  });
};

export default verify;