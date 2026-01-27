import mongoose from 'mongoose';

import { env } from './environment';

/**
 * Conecta a MongoDB usando la configuración de entorno
 */
export const connectToMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};

/**
 * Desconecta de MongoDB
 */
export const disconnectFromMongoDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error disconnecting from MongoDB:', error);
    throw error;
  }
};
