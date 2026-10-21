import { Request, Response, NextFunction } from 'express';
import { body, query, param, validationResult } from 'express-validator';

const validateTransactionRules = (
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

export const validateCreateTransactionRules = [
  body('amount')
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be a valid number greater than 0'),
  body('description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Description must not be empty')
    .isLength({ max: 100 })
    .withMessage('Description cannot exceed 100 characters'),
  body('date')
    .trim()
    .isISO8601()
    .withMessage('Date must be a valid ISO 8601 date (YYYY-MM-DD)')
    .toDate(),
  body('type')
    .trim()
    .notEmpty()
    .withMessage('Type is required')
    .isIn(['income', 'expense'])
    .withMessage('Type can only be expense or income'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category ID is required')
    .isMongoId()
    .withMessage('Invalid category ID'),
  validateTransactionRules,
];

export const validateUpdateTransactionRules = [
  body('amount')
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be a valid number greater than 0'),
  body('description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Description must not be empty')
    .isLength({ max: 100 })
    .withMessage('Description cannot exceed 100 characters'),
  body('date')
    .optional()
    .trim()
    .isISO8601()
    .withMessage('Date must be a valid ISO 8601 date (YYYY-MM-DD)')
    .toDate(),
  body('type')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Type is required')
    .isIn(['income', 'expense'])
    .withMessage('Type can only be expense or income'),
  body('category')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Category ID is required')
    .isMongoId()
    .withMessage('Invalid category ID'),
  validateTransactionRules,
];

export const validateGetTransactionRules = [
  query('type')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Type cannot be empty')
    .isIn(['income', 'expense'])
    .withMessage('Type can only be income or expense'),
  validateTransactionRules,
];

export const validateGetTransactionByIdRules = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Transaction ID required')
    .isMongoId()
    .withMessage('Invalid Transaction ID'),
  validateTransactionRules,
];

export const validateDeleteTransactionRules = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Transaction ID required')
    .isMongoId()
    .withMessage('Invalid Transaction ID'),
  validateTransactionRules,
];
