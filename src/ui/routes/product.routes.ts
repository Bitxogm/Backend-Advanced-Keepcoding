//Creamos router de express para tener todos los endpoints relacionados con productos en un solo archivo
import express from 'express';

import { createProductController } from '@ui/controllers/product/create-product-controller';
import { getAllProductsController } from '@ui/controllers/product/getAll-products-controller';

import { deleteProductController } from '../controllers/product/delete-product-controller';
import { findByIdProductController } from '../controllers/product/findById-product-controller';
import { UpdateProductController } from '../controllers/product/update-product-controller';
import { authenticationMiddleware } from '../middlewares/authentication-middleware';

// interface CreateProductBody {
//   name: string;
//   description: string;
// }

const productRouter: express.Router = express.Router();

// Endpoint to get all products - Usando arquitectura hexagonal
productRouter.get('/', getAllProductsController);

productRouter.get('/:productId', findByIdProductController);

// Usamos el controlador correctamente pasándolo como middleware
productRouter.post('/', [authenticationMiddleware], createProductController);

productRouter.patch('/:productId', UpdateProductController);

productRouter.delete('/:productId', deleteProductController);

export default productRouter;
