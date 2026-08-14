import { body } from 'express-validator';

export const loginValidator = [
  body('identifier')
    .trim()
    .notEmpty()
    .withMessage('Email or phone is required')
    .isLength({ max: 160 })
    .withMessage('Email or phone cannot exceed 160 characters'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8, max: 128 })
    .withMessage('Password must be between 8 and 128 characters')
];
