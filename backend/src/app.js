import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import { successResponse } from './utils/apiResponse.js';
import { notFoundMiddleware } from './middlewares/notFound.middleware.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(cors({
  origin(origin, callback) {
    if (!origin || env.allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);

app.get('/api/v1/health', (req, res) => {
  return successResponse({
    res,
    message: 'Al-Tariq Physical Therapy API is healthy',
    data: {
      service: 'al-tariq-physical-therapy-backend',
      environment: env.nodeEnv,
      timestamp: new Date().toISOString()
    }
  });
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
