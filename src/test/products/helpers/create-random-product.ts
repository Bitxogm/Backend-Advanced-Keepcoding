import request from "supertest";

import { app } from "../../../server";

// Helper para generar datos random sin faker (evita problemas de ES modules en Jest)
const randomString = () => Math.random().toString(36).substring(2, 10);

const fakeProduct = {
  productName: () => `Product ${randomString()}`,
  productDescription: () => `Description for product ${randomString()}`,
};

export const generateRandomProductData = () => ({
  name: fakeProduct.productName(),
  description: fakeProduct.productDescription(),
});

export const createRandomProduct = async () => {
  const response = await request(app)
    .post("/products")
    .send(generateRandomProductData());

  return response.body.item;
};
