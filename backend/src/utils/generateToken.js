import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const generateToken = ({ userId, sessionId }) => {
  return jwt.sign({ userId, sessionId }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });
};
