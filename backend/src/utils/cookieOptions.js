import { env } from '../config/env.js';

export const authCookieOptions = (expiresAt) => ({
  httpOnly: true,
  secure: env.isProduction,
  sameSite: env.isProduction ? 'strict' : 'lax',
  expires: expiresAt,
  path: '/'
});

export const clearAuthCookieOptions = () => ({
  httpOnly: true,
  secure: env.isProduction,
  sameSite: env.isProduction ? 'strict' : 'lax',
  path: '/'
});
