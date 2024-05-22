import { validationResult } from "express-validator";
import { errorResponse } from "../helpers/ResponseBuilder.js";

export const returnValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errorResponse(errors.array()[0]['msg']) );
  
    }
    next();
  };