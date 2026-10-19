import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Payload } from '../types/user.js';

export function verifyUser(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ error: 'Authorization missing' });
  }
  if (!authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  const token = authorization.split(' ')[1] as string;
  const secret = process.env.JWT_TOKEN;
  if (!secret) {
    throw new Error('JWT_TOKEN is not defined');
  }
  try {
    const decoded = jwt.verify(token, secret) as Payload;
    req.user = decoded;
    next();
  } catch (err: any) {
    console.error(err);
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Expired token' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}
