import mongoose from 'mongoose';
import { SESSION_STATUS, SESSION_STATUS_VALUES } from '../constants/sessionStatus.js';

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  sessionIdHash: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  status: {
    type: String,
    enum: SESSION_STATUS_VALUES,
    default: SESSION_STATUS.ACTIVE,
    index: true
  },
  expiresAt: {
    type: Date,
    required: true,
    index: true
  },
  revokedAt: {
    type: Date,
    default: null
  },
  revokedReason: {
    type: String,
    trim: true,
    maxlength: [160, 'Revoked reason cannot exceed 160 characters'],
    default: null
  },
  ipAddress: {
    type: String,
    trim: true,
    default: null
  },
  userAgent: {
    type: String,
    trim: true,
    maxlength: [500, 'User agent cannot exceed 500 characters'],
    default: null
  }
}, {
  timestamps: true
});

sessionSchema.index({ userId: 1, status: 1 });
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Session = mongoose.model('Session', sessionSchema);
