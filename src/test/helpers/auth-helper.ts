import { faker } from '@faker-js/faker';
import request from 'supertest';

import { app } from '@/server';

export async function signupAndGetToken(): Promise<{
  token: string;
  email: string;
  password: string;
}> {
  const email = faker.internet.email();
  const password = faker.internet.password();

  // Signup
  await request(app).post('/auth/signup').send({ email, password });

  // Signin to get token
  const signinResponse = await request(app).post('/auth/signin').send({ email, password });

  if (signinResponse.status !== 200 || !signinResponse.body.token) {
    throw new Error('Failed to get authentication token');
  }

  return {
    token: signinResponse.body.token,
    email,
    password,
  };
}

export function getAuthHeader(token: string): { Authorization: string } {
  return {
    Authorization: `Bearer ${token}`,
  };
}
