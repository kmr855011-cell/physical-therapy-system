import asyncHandler from 'express-async-handler';
import { revokeSession } from '../../services/auth.service.js';
import { env } from '../../config/env.js';
import { clearAuthCookieOptions } from '../../utils/cookieOptions.js';
import { successResponse } from '../../utils/apiResponse.js';

export const logout = asyncHandler(async (req, res) => {
  await revokeSession({
    userId: req.user._id,
    sessionId: req.auth.sessionId
  });

  res.clearCookie(env.cookieName, clearAuthCookieOptions());

  return successResponse({
    res,
    message: 'Logged out successfully',
    data: {}
  });
});
