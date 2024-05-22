import { check } from 'express-validator';
import User from "../models/User.js";
import { returnValidationErrors } from './ReturnValidationErrors.js';

export const validateUserAdd = [
  check('name').notEmpty().withMessage('Name is required'),
  check('email')
    .notEmpty().withMessage('Please enter an email')
    .isEmail().withMessage('Please enter a valid email')
    .custom(async email => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error('Email already in use');
      }
    }),
  check('password').notEmpty().withMessage('Please enter a password'),
  returnValidationErrors
];



