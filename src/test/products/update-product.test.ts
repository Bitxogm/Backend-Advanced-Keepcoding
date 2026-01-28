import { describe, test, expect } from "@jest/globals";
import request from "supertest";

import { app } from "../../server";

describe('PATCH / products/productId', () => { 

  test ("should return 404 if the product does not exist", async () => {
    // Intentar actualizar un producto que no existe en la base de datos
    const nonExistentProductId = "64b64c4f2f9b2567e4d3c123"; // ID que no existe en la base de datos

    const response = await request(app).patch(`/products/${nonExistentProductId}`).send({});

    expect (response.status).toBe (404);
    expect (response.body).toEqual ({
      message: "Product not found",
    });
  });

  test ("Given valid update data, should update and return the product", async () => {
    // Primero, crear un producto para luego actualizarlo
    const newProductData = {
      name: "Google Pixel 7",
      description: "Brand new, unopened box",
    };

    const createResponse = await request (app).post ("/products").send (newProductData);
    const createdProductId = createResponse.body.item._id;

    // Datos para actualizar el producto
    const updateData = {
      name: "Google Pixel 7 ",
      description: "Updated description",
    };

    // Hacer petición PATCH para actualizar el producto
    const updateResponse = await request (app)
      .patch (`/products/${createdProductId}`)
      .send (updateData);

    // Comprobar que el API devuelve el producto actualizado con status 200
    expect (updateResponse.status).toBe (200);

    // Verificar que los datos del producto han sido actualizados correctamente
    expect (updateResponse.body.item).toMatchObject (updateData);
  });
      
 });
