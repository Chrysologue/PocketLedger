import { Request, Response } from 'express';
import { Type } from './category.js';

export interface CreateTansaction {
  amount: number;
  description?: string;
  date: Date;
  type: Type;
  category: string;
}

export interface UpdateTransaction {
  amount?: number;
  description?: string;
  date?: Date;
  type?: Type;
  category?: string;
}

export interface TransactionController {
  createTransaction: (
    req: Request<{}, {}, CreateTansaction>,
    res: Response
  ) => Promise<Response>;
  getTransactions: (
    req: Request<{}, {}, {}, { type?: Type }>,
    res: Response
  ) => Promise<Response>;
  getTransactionById: (
    req: Request<{ id: string }>,
    res: Response
  ) => Promise<Response>;
  updateTransaction: (
    req: Request<{ id: string }>,
    res: Response
  ) => Promise<Response>;
  deleteTransaction: (
    req: Request<{ id: string }>,
    res: Response
  ) => Promise<Response>;
}
