import { check } from 'express-validator';
import { returnValidationErrors } from './ReturnValidationErrors.js';

export const BugAddUpdateValidation = [
  check('title')
    .notEmpty()
    .withMessage('title is required')
    .isLength({ min: 5, max: 100 })
    .withMessage('title must be between 5 and 100 characters long'),
  check('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 5, max: 1000 })
    .withMessage('Description must be between 5 and 1000 characters long'),
  check('assign_to')
    .isArray({ min: 1 })
    .withMessage('Please select user'),

  returnValidationErrors
];
