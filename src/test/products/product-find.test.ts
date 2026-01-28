import { describe, test, expect } from "@jest/globals";
import request from "supertest";

import { app } from "../../server";

describe("GET / products/:id", () => {
  test("should  return 404 if product not found or not exist", async () => {
    // Intentar obtener un producto con ID que no existe en la base de datos
    const response = await request(app).get(
      "/products/64b8f0c2f1d2c3a5b6e7f890",
    );

    // Verificar que devuelve 404 y el mensaje de error correcto
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Product not found" });
  });

  test("Given an existing product, return it", async () => {
    // Crear un producto y guardar su ID
    const createdProductResponse = await request(app).post("/products").send({
      name: "iPhone 17",
      description: "poco uso",
    });

    const productId = createdProductResponse.body.item._id;
    // console.log(createdProductResponse.body);

    // Hacer petición GET de ese producto específico
    const response = await request(app).get(`/products/${productId}`);

    // Comprobar que el API devuelve ese producto con status 200
    expect(response.status).toBe(200);
    expect(response.body.items[0]).toMatchObject({
      name: "iPhone 17",
      description: "poco uso",
    });
  });
});
