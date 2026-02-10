import { describe, test, expect } from '@jest/globals';
import request from 'supertest';

import { app } from '@/server';

import { signupAndGetToken, getAuthHeader } from '../helpers/auth-helper';

import { generateRandomProductData } from './helpers/create-random-product';

describe('POST / products/:id', () => {
  // Aquí irán las pruebas para la creación de productos

  test('should  return 404 if th product is not create', async () => {
    const { token } = await signupAndGetToken();

    // Intentar crear un producto sin enviar datos necesarios
    const createFailproduct = {};

    const response = await request(app).post('/products').set(getAuthHeader(token)).send({
      // Enviamos datos producto vacio
      createFailproduct,
    });

    // Verificar que devuelve 400 y el mensaje de error correcto
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Required fields are missing',
    });
  });

  test('Given valid product data, should create and return the product', async () => {
    const { token } = await signupAndGetToken();

    // Datos válidos para crear un producto
    const newProductData = generateRandomProductData();
    console.log(newProductData);

    // Hacer petición POST para crear el producto
    const response = await request(app)
      .post('/products')
      .set(getAuthHeader(token))
      .send(newProductData);
    // console.log(response.body)

    // Comprobar que el API devuelve el producto creado con status 201
    expect(response.status).toBe(201);
    expect(response.body.item).toMatchObject(newProductData);
  });
});
