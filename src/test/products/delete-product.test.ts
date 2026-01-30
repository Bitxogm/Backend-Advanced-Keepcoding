import { describe, test, expect } from '@jest/globals';
import request from 'supertest';

import { app } from '../../server';

import { generateRandomProductData } from './helpers/create-random-product';

describe('DELETE / products/:id', () => {
  test('should return  404 if the product does not exist', async () => {
    // Intentar eliminar un producto que no existe en la base de datos

    const response = await request(app).delete('/products/64b8f0c2f1d2c3a5b6e7f890');

    // Verificar que devuelve 404 y el mensaje de error correcto
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Product not found' });
  });

  test('Given an existing product, delete it', async () => {
    // Crear un producto y guardar su ID
    const productData = generateRandomProductData();
    const createdProductResponse = await request(app).post('/products').send(productData);

    const productId = createdProductResponse.body.item._id;

    // Hacer petición DELETE de ese producto específico
    const response = await request(app).delete(`/products/${productId}`);

    // Comprobar que el API devuelve status 200
    expect(response.status).toBe(200);

    // Verificar que el producto ya no existe
    const getResponse = await request(app).get(`/products/${productId}`);
    expect(getResponse.status).toBe(404);
    expect(getResponse.body).toEqual({ message: 'Product not found' });
  });
});
