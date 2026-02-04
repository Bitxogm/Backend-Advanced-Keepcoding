import { faker } from '@faker-js/faker';
import { describe, test, expect, beforeEach } from '@jest/globals';
import request from 'supertest';

import { app } from '@/server';

describe('Sign In Authentication Tests', () => {
  // Generar nuevos valores para cada test
  let testEmail: string;
  let testPassword: string;

  beforeEach(async () => {
    testEmail = faker.internet.email();
    testPassword = faker.internet.password();
    await request(app).post('/auth/signup').send({ email: testEmail, password: testPassword });
  });

  test('should sign in with correct credentials', async () => {
    const response = await request(app)
      .post('/auth/signin')
      .send({ email: testEmail, password: testPassword });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User signed in successfully.');
    // Si devuelves el token, puedes comprobarlo aquí
    // expect(response.body.token).toBeDefined();
  });

  test('should fail with wrong password', async () => {
    // Primero, login exitoso para asegurar que el usuario existe
    const okResponse = await request(app)
      .post('/auth/signin')
      .send({ email: testEmail, password: testPassword });
    expect(okResponse.status).toBe(200);
    // Ahora, probar con password incorrecto
    const response = await request(app)
      .post('/auth/signin')
      .send({ email: testEmail, password: 'wrongpass' });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid password');
  });

  test('should fail with non-existent user', async () => {
    const response = await request(app)
      .post('/auth/signin')
      .send({ email: 'nouser@example.com', password: 'irrelevant' });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('User not found');
  });

  test('should fail with missing fields', async () => {
    const response = await request(app).post('/auth/signin').send({ email: testEmail });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email and password are required.');
  });
});
