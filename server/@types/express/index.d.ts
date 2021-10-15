import User from '../../src/models/user';
import { Express } from 'express';
import FirebaseToken from '../../src/models/firebaseToken';

declare global {
  namespace Express {
    interface Request {
      user?: User
      questId?: number
      firebaseToken: FirebaseToken
    }
  }
}
