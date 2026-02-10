import { describe, test, expect } from '@jest/globals';
import request from 'supertest';

import { app } from '@/server';

import { signupAndGetToken, getAuthHeader } from '../helpers/auth-helper';

import { generateRandomProductData } from './helpers/create-random-product';

describe('GET / products/:id', () => {
  test('should  return 404 if product not found or not exist', async () => {
    const { token } = await signupAndGetToken();

    // Intentar obtener un producto con ID que no existe en la base de datos
    const response = await request(app)
      .get('/products/64b8f0c2f1d2c3a5b6e7f890')
      .set(getAuthHeader(token));

    // Verificar que devuelve 404 y el mensaje de error correcto
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Product not found' });
  });

  test('Given an existing product, return it', async () => {
    const { token } = await signupAndGetToken();

    // Crear un producto y guardar su ID
    const productData = generateRandomProductData();
    const createdProductResponse = await request(app)
      .post('/products')
      .set(getAuthHeader(token))
      .send(productData);

    const productId = createdProductResponse.body.item.id;
    // console.log(createdProductResponse.body);

    // Hacer petición GET de ese producto específico
    const response = await request(app).get(`/products/${productId}`).set(getAuthHeader(token));

    // Comprobar que el API devuelve ese producto con status 200
    expect(response.status).toBe(200);
    expect(response.body.items[0]).toMatchObject(productData);
  });
});

describe('GET/ products', () => {
  test('should return empty array if there are not products', async () => {
    const { token } = await signupAndGetToken();

    const response = await request(app).get('/products').set(getAuthHeader(token));

    expect(response.status).toBe(200);
    expect(response.body.count).toBe(0);
    expect(response.body.items).toEqual([]);
  });

  test('should return all products', async () => {
    const { token } = await signupAndGetToken();

    // Crear varios productos para poblar la base de datos
    const productsToCreate = [generateRandomProductData(), generateRandomProductData()];

    // Crear los productos en la base de datos
    for (const productData of productsToCreate) {
      await request(app).post('/products').set(getAuthHeader(token)).send(productData);
    }

    // Hacer petición GET para obtener todos los productos
    const response = await request(app).get('/products').set(getAuthHeader(token));

    // Comprobar que el API devuelve todos los productos con status 200
    expect(response.status).toBe(200);
    expect(response.body.count).toBeGreaterThanOrEqual(productsToCreate.length);
    expect(response.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining(productsToCreate[0]),
        expect.objectContaining(productsToCreate[1]),
      ])
    );
  });
});
