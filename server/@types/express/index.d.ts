import User from '../../src/models/user';
import { Express } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: User
      questId?: number
    }
  }
}
