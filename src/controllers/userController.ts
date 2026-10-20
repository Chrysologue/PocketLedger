import {
  UserController,
  CreateUser,
  UpdateUser,
  Login,
  Payload,
} from '../types/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { Request, Response } from 'express';

export const userController: UserController = {
  createUser: async (req: Request<{}, {}, CreateUser>, res: Response) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const isExisting = await User.findOne({ email });
      if (isExisting) {
        return res.status(409).json({ error: 'Email already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      const newUser = user.toObject();
      delete (newUser as any).password;
      return res
        .status(201)
        .json({ message: 'Account successfully created', newUser });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  getProfile: async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id as string;
      const user = await User.findById(userId);
      return res.status(200).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  updateProfile: async (req: Request<{}, {}, UpdateUser>, res: Response) => {
    try {
      const updates: UpdateUser = {};
      const userId = req.user?.id as string;
      if (req.body.name !== undefined) {
        updates.name = req.body.name;
      }
      if (req.body.password !== undefined) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        updates.password = hashedPassword;
      }

      const user = await User.findByIdAndUpdate(
        userId,
        {
          $set: updates,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      return res
        .status(200)
        .json({ message: 'User is successfully updated', user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  deleteAccount: async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id as string;
      const deletedUser = await User.findByIdAndDelete(userId);
      return res
        .status(200)
        .json({ message: 'Account successfully deleted', deletedUser });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  login: async (req: Request<{}, {}, Login>, res: Response) => {
    try {
      const { email, password } = req.body as Login;
      if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      const isMatching = await bcrypt.compare(password, user.password);
      if (!isMatching) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
      const payload: Payload = {
        id: user._id.toString(),
        role: user.role,
      };
      const secret = process.env.JWT_TOKEN;
      if (!secret) {
        throw new Error('JWT Secret missing');
      }
      const token = jwt.sign(payload, secret, {
        expiresIn: '1h',
      });
      return res.status(200).json({ message: 'Successfully logged in', token });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};
