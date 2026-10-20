import { Request, Response } from 'express';
import {
  CreateCategory,
  UpdateCategory,
  CategoryShape,
  CategoryController,
} from '../types/category.js';
import Category from '../models/Category.js';

export const categoryController: CategoryController = {
  createCategory: async (
    req: Request<{}, {}, CreateCategory>,
    res: Response
  ) => {
    try {
      const userId = req.user?.id as string;
      const category: CreateCategory = req.body;
      const newCategory = { ...category, user: userId };
      const result = await Category.create(newCategory);
      return res
        .status(201)
        .json({ message: 'Category created successfully', category: result });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  getCategories: async (
    req: Request<{}, {}, {}, { type?: string }>,
    res: Response
  ) => {
    try {
      const filter: Record<string, any> = {};
      const userId = req.user?.id;
      filter.user = userId;
      if (req.query.type !== undefined) {
        filter.type = req.query.type;
      }
      const categories = await Category.find(filter);
      return res.status(200).json(categories);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  getCategoryById: async (req: Request<{ id: string }>, res: Response) => {
    try {
      const userId = req.user?.id as string;
      const categoryId = req.params.id;
      const category = await Category.findOne({
        _id: categoryId,
        user: userId,
      });
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      return res.status(200).json(category);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  updateCategory: async (
    req: Request<{ id: string }, {}, UpdateCategory>,
    res: Response
  ) => {
    try {
      const updates: UpdateCategory = {};
      const userId = req.user?.id;
      const categoryId = req.params.id;
      if (req.body.name !== undefined) {
        updates.name = req.body.name;
      }
      if (req.body.type !== undefined) {
        updates.type = req.body.type;
      }
      const updatedCategory = await Category.findOneAndUpdate(
        { _id: categoryId, user: userId } as any,
        { $set: updates },
        { new: true, runValidators: true }
      );
      if (!updatedCategory) {
        return res.status(404).json({ error: 'Category not found' });
      }
      return res.status(200).json({
        message: 'Category updated successfully',
        category: updatedCategory,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  deleteCategory: async (req: Request<{ id: string }>, res: Response) => {
    try {
      const userId = req.user?.id;
      const categoryId = req.params.id;
      const deletedCategory = await Category.findOneAndDelete({
        _id: categoryId,
        user: userId,
      } as any);
      if (!deletedCategory) {
        return res.status(404).json({ error: 'Category not found' });
      }
      return res.status(200).json({
        message: 'Category successfully deleted',
        category: deletedCategory,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};
