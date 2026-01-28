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

describe("GET/ products", () => {
  
  test("should return empty array if there are not products", async () => {
    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
    expect(response.body.count).toBe(0);
    expect(response.body.items).toEqual([]);
  });

  test("should return all products", async () => {
    // Crear varios productos para poblar la base de datos
    const productsToCreate = [
      { name: "Product 1", description: "Description 1" },
      { name: "Product 2", description: "Description 2" },
    ];

    // Crear los productos en la base de datos
    for (const productData of productsToCreate) {
      await request(app).post("/products").send(productData);
    }

    // Hacer petición GET para obtener todos los productos
    const response = await request(app).get("/products");

    // Comprobar que el API devuelve todos los productos con status 200
    expect(response.status).toBe(200);
    expect(response.body.count).toBeGreaterThanOrEqual(productsToCreate.length);
    expect(response.body.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Product 1",
          description: "Description 1",
        }),
        expect.objectContaining({
          name: "Product 2",
          description: "Description 2",
        }),
      ]),
    );
  });
});
