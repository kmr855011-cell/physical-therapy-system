import { validationResult } from 'express-validator';
import { validationResponse } from '../utils/apiResponse.js';

export const validateRequest = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  const errors = result.array().reduce((accumulator, error) => {
    const fieldName = error.path || error.param || 'request';

    if (!accumulator[fieldName]) {
      accumulator[fieldName] = [];
    }

    accumulator[fieldName].push(error.msg);
    return accumulator;
  }, {});

  return validationResponse({ res, errors });
};
