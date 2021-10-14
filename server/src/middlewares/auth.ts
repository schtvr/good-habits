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
      const userToken = await user.getFirebaseTokens(); 
      const sentToken = req.body.firebaseToken || 'c2aK9KHmw8E:APA91bF7MY9bNnvGAXgbHN58lyDxc9KnuXNXwsqUs4uV4GyeF06HM1hMm-etu63S_4C-GnEtHAxJPJJC4H__VcIk90A69qQz65toFejxyncceg0_j5xwoFWvPQ5pzKo69rUnuCl1GSSv'; 
      if (!userToken) await user.createFirebaseTokens({firebaseId: sentToken});
    } catch (err) { console.log(err);}
    return next();
  });
};

export default verify;