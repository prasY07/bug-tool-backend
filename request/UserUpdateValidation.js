import { check } from 'express-validator';
import User from "../models/User.js";
import { returnValidationErrors } from './ReturnValidationErrors.js';

export const validateUserUpdate = [
  check('name').notEmpty().withMessage('Name is required'),
  check('email')
  .notEmpty().withMessage('Please enter an email')
  .isEmail().withMessage('Please enter a valid email')
  .custom(async (email, { req }) => {
    const userId = req.params.id; // Assuming user ID is passed as a route parameter
    const user = await User.findOne({ email, _id: { $ne: userId } });
    if (user) {
      throw new Error('Email already in use');
    }
  }),
  returnValidationErrors
  
];



