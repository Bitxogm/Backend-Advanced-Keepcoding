/**
 * Configuración de variables de entorno
 * Centraliza todas las variables de entorno en un solo lugar con validación de tipos
 */

interface Environment {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  MONGODB_URI: string;
}

/**
 * Obtiene una variable de entorno o devuelve el valor por defecto
 */
const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (!value && !defaultValue) {
    console.warn(`⚠️  Variable de entorno ${key} no definida`);
  }
  return value || defaultValue || '';
};

/**
 * Configuración de entorno exportada y tipada
 */
export const env: Environment = {
  NODE_ENV: (getEnv('NODE_ENV', 'development') as Environment['NODE_ENV']),
  PORT: parseInt(getEnv('PORT', '3000'), 10),
  MONGODB_URI: getEnv(
    'MONGODB_URI',
    'mongodb://admin:admin123@localhost:27018/db?authSource=admin'
  ),
};

/**
 * Valida que todas las variables requeridas estén configuradas
 */
export const validateEnvironment = (): void => {
  const requiredVars: (keyof Environment)[] = ['MONGODB_URI', 'PORT'];
  
  const missing = requiredVars.filter(key => !env[key]);
  
  if (missing.length > 0) {
    throw new Error(
      `❌ Variables de entorno requeridas no configuradas: ${missing.join(', ')}`
    );
  }
  
  console.log(`🔧 Environment: ${env.NODE_ENV}`);
};
