import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult, query } from 'express-validator';

const validateCategoryRules = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ error: errors.array().map((err) => err.msg) });
  }
  next();
};

export const validateCreateCategoryRules = [
  body('name').trim().notEmpty().withMessage('Name cannot be empty'),
  body('type')
    .trim()
    .notEmpty()
    .withMessage('Type cannot be empty')
    .isIn(['income', 'expense'])
    .withMessage('Type can only be income or expense'),
  validateCategoryRules,
];
export const validateUpdateCategoryRules = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Category ID cannot be empty')
    .isMongoId()
    .withMessage('Invalid Category Id'),
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('type')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Type cannot be empty')
    .isIn(['income', 'expense'])
    .withMessage('Type can only be income or expense'),
  validateCategoryRules,
];

export const validateGetCategoryByIdRules = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Category ID cannot be empty')
    .isMongoId()
    .withMessage('Invalid Category Id'),
  validateCategoryRules,
];
export const validateGetCategoryRules = [
  query('type')
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Type cannot be empty')
    .isIn(['income', 'expense'])
    .withMessage('Type can only be income or expense'),
  validateCategoryRules,
];
export const validateDeleteCategotyRules = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Category ID cannot be empty')
    .isMongoId()
    .withMessage('Invalid Category Id'),
  validateCategoryRules,
];
