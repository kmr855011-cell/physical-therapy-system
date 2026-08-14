export const successResponse = ({ res, statusCode = 200, message = 'Operation completed successfully', data = {} }) => {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data
  });
};

export const failResponse = ({ res, statusCode = 400, message = 'Something went wrong', data = null }) => {
  return res.status(statusCode).json({
    status: 'fail',
    message,
    data
  });
};

export const validationResponse = ({ res, errors, message = 'Validation failed' }) => {
  return res.status(422).json({
    status: 'validation',
    message,
    data: {
      errors
    }
  });
};
