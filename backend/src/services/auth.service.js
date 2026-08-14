import { User } from '../models/user.model.js';
import { Session } from '../models/session.model.js';
import { ACCOUNT_STATUS } from '../constants/accountStatus.js';
import { SESSION_STATUS } from '../constants/sessionStatus.js';
import { env } from '../config/env.js';
import { generateToken } from '../utils/generateToken.js';
import { createSessionId, hashSessionId } from '../utils/sessionSecurity.js';
import { getJwtExpiryDate } from '../utils/jwtExpiry.js';

const createAuthError = (message = 'Invalid login credentials', statusCode = 401) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const sanitizeUser = (user) => user.toJSON();

export const loginUser = async ({ identifier, password, ipAddress, userAgent }) => {
  const normalizedIdentifier = identifier.trim().toLowerCase();

  const user = await User.findOne({
    $or: [
      { email: normalizedIdentifier },
      { phone: identifier.trim() }
    ]
  }).select('+password');

  if (!user) {
    throw createAuthError();
  }

  const passwordMatches = await user.comparePassword(password);

  if (!passwordMatches) {
    throw createAuthError();
  }

  if (user.accountStatus !== ACCOUNT_STATUS.ACTIVE) {
    throw createAuthError('Account is not active', 403);
  }

  const sessionId = createSessionId();
  const sessionIdHash = hashSessionId(sessionId);
  const expiresAt = getJwtExpiryDate(env.jwtExpiresIn);

  await Session.create({
    userId: user._id,
    sessionIdHash,
    status: SESSION_STATUS.ACTIVE,
    expiresAt,
    ipAddress,
    userAgent
  });

  user.lastLoginAt = new Date();
  await user.save();

  const token = generateToken({ userId: user._id.toString(), sessionId });

  return {
    token,
    expiresAt,
    user: sanitizeUser(user)
  };
};

export const revokeSession = async ({ userId, sessionId, reason = 'User logged out' }) => {
  const sessionIdHash = hashSessionId(sessionId);

  await Session.findOneAndUpdate({
    userId,
    sessionIdHash,
    status: SESSION_STATUS.ACTIVE
  }, {
    status: SESSION_STATUS.REVOKED,
    revokedAt: new Date(),
    revokedReason: reason
  });
};

export const revokeAllUserSessions = async ({ userId, reason = 'User logged out from all sessions' }) => {
  await Session.updateMany({
    userId,
    status: SESSION_STATUS.ACTIVE
  }, {
    status: SESSION_STATUS.REVOKED,
    revokedAt: new Date(),
    revokedReason: reason
  });
};
