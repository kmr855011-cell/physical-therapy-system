import dotenv from 'dotenv';

dotenv.config();

const requiredEnvironmentVariables = ['NODE_ENV', 'PORT', 'DB_URI', 'JWT_SECRET'];

requiredEnvironmentVariables.forEach((variableName) => {
  if (!process.env[variableName]) {
    throw new Error(`Missing required environment variable: ${variableName}`);
  }
});

const parseAllowedOrigins = (origins) => {
  if (!origins) {
    return [];
  }

  return origins
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
};

export const env = {
  nodeEnv: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === 'production',
  port: Number(process.env.PORT) || 5000,
  dbUri: process.env.DB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  cookieName: process.env.COOKIE_NAME || 'al_tariq_auth',
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET
  },
  allowedOrigins: parseAllowedOrigins(process.env.ALLOWED_ORIGINS)
};
