//Creamos router de express para tener todos los endpoints relacionados con productos en un solo archivo
import express from 'express';
import type { Request, Response } from 'express';

import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from '../../config/constants';
import Product from '../../infrastructure/models/product-model';
import { createProductController } from '../controllers/product/create-product-controller';
import { getAllProductsController } from '../controllers/product/getAll-products-controller';

interface CreateProductBody {
  name: string;
  description: string;
}

const productRouter: express.Router = express.Router();

// Endpoint to get all products - Usando arquitectura hexagonal
productRouter.get('/', getAllProductsController);

productRouter.get(
  '/:productId',
  async (req: Request<{ productId: string }>, res: Response): Promise<void> => {
    const productId = req.params.productId;

    const product = await Product.findById(productId);

    if (product) {
      res.json({
        count: product ? 1 : 0,
        items: product ? [product] : [],
      });
    } else {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: ERROR_MESSAGES.PRODUCT_NOT_FOUND });
    }
  }
);

// Usamos el controlador correctamente pasándolo como middleware
productRouter.post('/', createProductController);

productRouter.patch(
  '/:productId',
  async (
    req: Request<{ productId: string }, {}, CreateProductBody>,
    res: Response
  ): Promise<void> => {
    // Sacamos de la peticion todos los datos que necesitamos para trabajar con ellos
    const { productId } = req.params;
    const { name, description } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description },
      { new: true }
    );

    if (updatedProduct) {
      res.json({ item: updatedProduct });
    } else {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: ERROR_MESSAGES.PRODUCT_NOT_FOUND });
    }
  }
);

productRouter.delete(
  '/:productId',
  async (req: Request<{ productId: string }>, res: Response): Promise<void> => {
    const { productId } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (deletedProduct) {
      res.json({ message: SUCCESS_MESSAGES.PRODUCT_DELETED });
    } else {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: ERROR_MESSAGES.PRODUCT_NOT_FOUND });
    }
  }
);

export default productRouter;
