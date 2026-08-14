import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { env } from '../config/env.js';
import { User } from '../models/user.model.js';
import { Session } from '../models/session.model.js';
import { ACCOUNT_STATUS } from '../constants/accountStatus.js';
import { SESSION_STATUS } from '../constants/sessionStatus.js';
import { hashSessionId } from '../utils/sessionSecurity.js';

const createUnauthorizedError = (message = 'Authentication required') => {
  const error = new Error(message);
  error.statusCode = 401;
  return error;
};

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.[env.cookieName];

  if (!token) {
    throw createUnauthorizedError();
  }

  const decoded = jwt.verify(token, env.jwtSecret);

  if (!decoded?.userId || !decoded?.sessionId) {
    throw createUnauthorizedError('Invalid authentication token');
  }

  const session = await Session.findOne({
    userId: decoded.userId,
    sessionIdHash: hashSessionId(decoded.sessionId),
    status: SESSION_STATUS.ACTIVE
  });

  if (!session) {
    throw createUnauthorizedError('Session is no longer active');
  }

  if (session.expiresAt <= new Date()) {
    session.status = SESSION_STATUS.EXPIRED;
    await session.save();
    throw createUnauthorizedError('Session has expired');
  }

  const user = await User.findById(decoded.userId);

  if (!user || user.accountStatus !== ACCOUNT_STATUS.ACTIVE) {
    throw createUnauthorizedError('User account is not active');
  }

  req.user = user;
  req.session = session;
  req.auth = {
    sessionId: decoded.sessionId
  };

  return next();
});
