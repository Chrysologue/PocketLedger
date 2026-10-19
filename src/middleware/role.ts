import { Role } from '../types/user.js';
import { Request, Response, NextFunction } from 'express';
export function verifyRole(role: Role) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (req.user?.role !== role) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  };
}
