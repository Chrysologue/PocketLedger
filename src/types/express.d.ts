import { Payload } from './user.ts';

declare global {
  namespace Express {
    interface Request {
      user?: Payload;
    }
  }
}

export {};
