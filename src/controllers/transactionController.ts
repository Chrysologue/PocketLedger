import { Request, Response } from 'express';
import { Type } from '../types/category.js';
import {
  TransactionController,
  CreateTansaction,
  UpdateTransaction,
} from '../types/transaction.js';

import Transaction from '../models/Transaction.js';
import Category from '../models/Category.js';

export const transactionController: TransactionController = {
  createTransaction: async (
    req: Request<{}, {}, CreateTansaction>,
    res: Response
  ) => {
    try {
      const { amount, description, date, type, category } = req.body;

      if (!amount || !date || !type || !category) {
        return res
          .status(400)
          .json({ error: 'Make sure to fill all required fields' });
      }
      const userId = req.user?.id as string;

      //Find the chosen category
      const userCategory = await Category.findOne({
        user: userId,
        _id: category,
      } as any);
      if (!userCategory) {
        return res.status(404).json({ error: 'Category not found' });
      }
      if (userCategory.type !== type) {
        return res
          .status(400)
          .json({ error: 'Transaction type must match the category type' });
      }
      const transaction = await Transaction.create({
        amount,
        description,
        date,
        type,
        user: userId,
        category,
      } as any);
      return res
        .status(201)
        .json({ message: 'Transaction created successfully', transaction });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  getTransactions: async (
    req: Request<{}, {}, {}, { type?: Type }>,
    res: Response
  ) => {
    try {
      const userId = req.user?.id as string;
      const filter: Record<string, any> = {};
      filter.user = userId;
      if (req.query.type) {
        filter.type = req.query.type;
      }
      const transactions = await Transaction.find(filter);
      return res.status(200).json(transactions);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  getTransactionById: async (req: Request<{ id: string }>, res: Response) => {
    try {
      const userId = req.user?.id as string;
      const id = req.params.id as string;

      const transaction = await Transaction.findOne({ _id: id, user: userId });
      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      return res.status(200).json(transaction);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  updateTransaction: async (
    req: Request<{ id: string }, {}, UpdateTransaction>,
    res: Response
  ) => {
    try {
      const userId = req.user?.id as string;
      const transId = req.params.id as string;

      const updates = {} as UpdateTransaction;
      if (req.body.amount !== undefined) {
        updates.amount = req.body.amount;
      }
      if (req.body.description !== undefined) {
        updates.description = req.body.description;
      }
      if (req.body.date !== undefined) {
        updates.date = req.body.date;
      }
      if (req.body.type !== undefined) {
        updates.type = req.body.type;
      }
      if (req.body.category !== undefined) {
        updates.category = req.body.category;
      }

      const transaction = await Transaction.findOneAndUpdate(
        {
          _id: transId,
          user: userId,
        },
        { $set: updates },
        { new: true, runValidators: true }
      );
      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      return res
        .status(200)
        .json({ message: 'Transaction updated successfully', transaction });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  deleteTransaction: async (
    req: Request<{ id: string }, {}, UpdateTransaction>,
    res: Response
  ) => {
    try {
      const userId = req.user?.id as string;
      const transId = req.params.id as string;
      const deletedTransaction = await Transaction.findOneAndDelete({
        _id: transId,
        user: userId,
      });
      if (!deletedTransaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      return res.status(200).json({
        message: 'Transaction deleted successfully',
        transaction: deletedTransaction,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};
