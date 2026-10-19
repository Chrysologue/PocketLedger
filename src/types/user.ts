import { Request, Response } from 'express';

export type Role = 'user' | 'admin';

export interface User {
  name: string;
  email: string;
}

export interface Login {
  email: string;
  password: string;
}
export interface CreateUser {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUser {
  name?: string;
  password?: string;
}

export interface Payload {
  id: string;
  role: Role;
}

export interface UserController {
  createUser: (
    req: Request<{}, {}, CreateUser>,
    res: Response
  ) => Promise<Response>;
  getAllUsers: (req: Request, res: Response) => Promise<Response>;
  getProfile: (req: Request, res: Response) => Promise<Response>;
  updateProfile: (
    req: Request<{}, {}, UpdateUser>,
    res: Response
  ) => Promise<Response>;
  deleteAccount: (req: Request, res: Response) => Promise<Response>;
  login: (req: Request<{}, {}, Login>, res: Response) => Promise<Response>;
}
