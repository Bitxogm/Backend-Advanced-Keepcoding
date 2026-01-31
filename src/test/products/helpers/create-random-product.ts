import { faker } from '@faker-js/faker';
import request from 'supertest';

import { app } from '@/server';

export const generateRandomProductData = () => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
  };
};

export const createRandomProduct = async () => {
  const productData = generateRandomProductData();
  const newProductResponse = await request(app).post('/products').send(productData);

  return newProductResponse;
};
