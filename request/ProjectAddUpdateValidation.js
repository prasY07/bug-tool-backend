import { check } from 'express-validator';
import { returnValidationErrors } from './ReturnValidationErrors.js';

export const validateProjectAddUpdate = [
  check('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 5, max: 100 })
    .withMessage('Name must be between 5 and 100 characters long'),
  check('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 5, max: 1000 })
    .withMessage('Description must be between 5 and 1000 characters long'),
  check('deadline_date')
    .notEmpty()
    .withMessage('Deadline date is required')
    .isISO8601()
    .withMessage('Deadline date must be a valid date')
    .custom((value) => {
      const deadline = new Date(value);
      if (deadline <= new Date()) {
        throw new Error('The date should be in the future, after the current time.');
      }
      return true;
    }),
  returnValidationErrors
];
