import asyncHandler from 'express-async-handler';
import { loginUser } from '../../services/auth.service.js';
import { env } from '../../config/env.js';
import { authCookieOptions } from '../../utils/cookieOptions.js';
import { successResponse } from '../../utils/apiResponse.js';

export const login = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body;

  const authResult = await loginUser({
    identifier,
    password,
    ipAddress: req.ip,
    userAgent: req.get('user-agent')
  });

  res.cookie(env.cookieName, authResult.token, authCookieOptions(authResult.expiresAt));

  return successResponse({
    res,
    message: 'Logged in successfully',
    data: {
      user: authResult.user
    }
  });
});
