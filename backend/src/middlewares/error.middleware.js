import { env } from '../config/env.js';

const buildErrorMessage = (error) => {
  if (error.name === 'CastError') {
    return 'Invalid resource identifier';
  }

  if (error.code === 11000) {
    return 'Duplicate field value entered';
  }

  if (error.name === 'JsonWebTokenError') {
    return 'Invalid authentication token';
  }

  if (error.name === 'TokenExpiredError') {
    return 'Authentication token has expired';
  }

  return error.message || 'Something went wrong';
};

export const errorMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || error.status || 500;
  const response = {
    status: 'fail',
    message: env.isProduction && statusCode === 500 ? 'Something went wrong' : buildErrorMessage(error),
    data: null
  };

  if (!env.isProduction) {
    response.stack = error.stack;
  }

  return res.status(statusCode).json(response);
};
