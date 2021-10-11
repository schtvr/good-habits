import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

export interface IVerifiedRequest extends Request{
  user: User | undefined
}

const verify = (req: IVerifiedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).send('Unauthorized');
  }
  jwt.verify(token, config.SECRET, async (err: any, payload: JwtPayload | undefined) => {
    if (err) return res.sendStatus(403);
    if (!payload || !payload.userId) return res.status(403).send('Was not passed userId');
    const { userId } = payload;
    const user: User | null = await User.findOne({
      where: { id: userId }
    });
    if (!user) return res.sendStatus(404);
    req.user = user;

    return next();
  });
};

export default verify;