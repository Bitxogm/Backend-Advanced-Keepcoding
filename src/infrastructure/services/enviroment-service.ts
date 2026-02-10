import dotenv from 'dotenv';
import * as z from 'zod';

dotenv.config();

const enviromentVariablesValidator = z.object({
  ENVIRONMENT: z.enum(['production', 'development', 'test', 'staging']).default('development'),
  API_PORT: z.string().default('3000'),
  MONGO_USER: z.string(),
  MONGO_PASSWORD: z.string(),
  JWT_SECRET: z.string(),
});

type EnviromentVariables = z.infer<typeof enviromentVariablesValidator>;

class EnviromentService {
  private enviromentVariables: EnviromentVariables | null = null;

  loadEnviromentVariables() {
    if (this.enviromentVariables) {
      return;
    }
    const currentEnviroment = process.env.NODE_ENV || 'development';
    const enviromentFile = this.getEnviromentFile(currentEnviroment);
    const resultVariables: dotenv.DotenvConfigOutput = dotenv.config({ path: enviromentFile });
    console.log({ resultVariables });
    if (resultVariables.error) {
      throw new Error('Error loading enviroment variables: ' + resultVariables.error.message);
    }

    try {
      enviromentVariablesValidator.parse(resultVariables.parsed);
    } catch (error) {
      throw new Error('Invalid enviroment variables: ' + error);
    }
  }

  getEnviromentVariable() {
    if (!this.enviromentVariables) {
      throw new Error('Enviroment variables not loaded');
    }
    return this.enviromentVariables;
  }

  private getEnviromentFile(currentEnviroment: string): string {
    switch (currentEnviroment) {
      case 'production':
        return '.env.production';
      case 'development':
        return '.env.development';
      case 'test':
        return '.env.test';
      case 'staging':
        return '.env.staging';
      default:
        return '.env';
    }
  }
}

export const enviromentService = new EnviromentService();
