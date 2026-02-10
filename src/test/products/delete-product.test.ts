import { describe, test, expect } from '@jest/globals';
import request from 'supertest';

import { app } from '@/server';

import { signupAndGetToken, getAuthHeader } from '../helpers/auth-helper';

import { generateRandomProductData } from './helpers/create-random-product';

describe('DELETE / products/:id', () => {
  test('should return  404 if the product does not exist', async () => {
    const { token } = await signupAndGetToken();

    // Intentar eliminar un producto que no existe en la base de datos

    const response = await request(app)
      .delete('/products/64b8f0c2f1d2c3a5b6e7f890')
      .set(getAuthHeader(token));

    // Verificar que devuelve 404 y el mensaje de error correcto
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Product not found' });
  });

  test('Given an existing product, delete it', async () => {
    const { token } = await signupAndGetToken();

    // Crear un producto y guardar su ID
    const productData = generateRandomProductData();
    const createdProductResponse = await request(app)
      .post('/products')
      .set(getAuthHeader(token))
      .send(productData);

    const productId = createdProductResponse.body.item.id;

    // Hacer petición DELETE de ese producto específico
    const response = await request(app).delete(`/products/${productId}`).set(getAuthHeader(token));

    // Comprobar que el API devuelve status 200
    expect(response.status).toBe(200);

    // Verificar que el producto ya no existe
    const getResponse = await request(app).get(`/products/${productId}`).set(getAuthHeader(token));
    expect(getResponse.status).toBe(404);
    expect(getResponse.body).toEqual({ message: 'Product not found' });
  });
});
