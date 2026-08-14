import crypto from 'crypto';

export const createSessionId = () => crypto.randomBytes(32).toString('hex');

export const hashSessionId = (sessionId) => {
  return crypto.createHash('sha256').update(sessionId).digest('hex');
};
