import express from 'express';
import type { Application } from 'express';

import { API_CONFIG } from './config/constants';
import { connectToMongoDB } from './config/database';
import { env, validateEnvironment } from './config/environment';
import productRouter from './routes/product.route';

const startHttpApi = (): void => {
  // Create Express app
  const app: Application = express();

  // Middleware to parse JSON bodies
  app.use(express.json());

  // Use product routes
  app.use(API_CONFIG.PRODUCTS_PATH, productRouter);

  // Start the server
  app.listen(env.PORT, () => {
    console.log(`✅ ApiServer is running on port: ${env.PORT}`);
  });
};

const executeApp = async () => {
  try {
    // Validate environment variables
    validateEnvironment();

    // Connect to MongoDB
    await connectToMongoDB();

    // Start HTTP API
    startHttpApi();
  } catch (error) {
    console.error('❌ Error starting application:', error);
    process.exit(1);
  }
};

executeApp();
