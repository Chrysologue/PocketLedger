import { body, query, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const validateUserRules = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array().map((err) => err.msg),
    });
  }
  next();
};
export const validateCreateUser = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .toLowerCase()
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    })
    .withMessage('Password does not meet requirement '),
  validateUserRules,
];

export const validateUpdateUser = [
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),
  body('password')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Password cannot be empty if provided')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    })
    .withMessage('Password does not meet strong security requirements'),
  validateUserRules,
];

export const validateLoginRules = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .toLowerCase()
    .isEmail()
    .withMessage('Invalid email format'),
  body('password').trim().notEmpty().withMessage('Password is required'),
  validateUserRules,
];
