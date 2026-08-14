import asyncHandler from 'express-async-handler';
import { revokeAllUserSessions } from '../../services/auth.service.js';
import { env } from '../../config/env.js';
import { clearAuthCookieOptions } from '../../utils/cookieOptions.js';
import { successResponse } from '../../utils/apiResponse.js';

export const logoutAll = asyncHandler(async (req, res) => {
  await revokeAllUserSessions({
    userId: req.user._id
  });

  res.clearCookie(env.cookieName, clearAuthCookieOptions());

  return successResponse({
    res,
    message: 'Logged out from all sessions successfully',
    data: {}
  });
});
