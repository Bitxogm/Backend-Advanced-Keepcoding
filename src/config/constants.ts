/**
 * Constantes de la aplicación
 * Centraliza valores constantes usados en toda la aplicación
 */

/**
 * Códigos de estado HTTP comunes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

/**
 * Mensajes de error estándar
 */
export const ERROR_MESSAGES = {
  PRODUCT_NOT_FOUND: 'Product not found',
  INVALID_REQUEST: 'Invalid request data',
  REQUIRED_FIELDS: 'Required fields are missing',
  DATABASE_ERROR: 'Database error occurred',
  SERVER_ERROR: 'Internal server error',
} as const;

/**
 * Mensajes de éxito
 */
export const SUCCESS_MESSAGES = {
  PRODUCT_CREATED: 'Product created successfully',
  PRODUCT_UPDATED: 'Product updated successfully',
  PRODUCT_DELETED: 'Product deleted successfully',
} as const;

/**
 * Configuración de la API
 */
export const API_CONFIG = {
  BASE_PATH: '/api',
  VERSION: 'v1',
  PRODUCTS_PATH: '/products',
} as const;

/**
 * Límites de paginación
 */
export const PAGINATION = {
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  DEFAULT_PAGE: 1,
} as const;
