import asyncHandler from 'express-async-handler';
import { successResponse } from '../../utils/apiResponse.js';

export const getMe = asyncHandler(async (req, res) => {
  return successResponse({
    res,
    message: 'Authenticated user retrieved successfully',
    data: {
      user: req.user.toJSON()
    }
  });
});
