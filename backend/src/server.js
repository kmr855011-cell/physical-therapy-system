import app from './app.js';
import { connectDatabase } from './config/database.js';
import { env } from './config/env.js';

const startServer = async () => {
  await connectDatabase();

  app.listen(env.port, () => {
    console.log(`Server running in ${env.nodeEnv} mode on port ${env.port}`);
  });
};

startServer();
