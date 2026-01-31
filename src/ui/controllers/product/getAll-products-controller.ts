import type { Request, Response } from 'express';

import { HTTP_STATUS } from '@config/constants';
import { GetAllProductsUseCase } from '@domain/use-cases/getAll-products-usecase';
import { ProductMongoDbRepository } from '@infrastructure/repositories/product/product-mongodb-repository';

export const getAllProductsController = async (request: Request, response: Response) => {
  const productMongodbRepository = new ProductMongoDbRepository();
  const getAllProductsUseCase = new GetAllProductsUseCase(productMongodbRepository);
  const products = await getAllProductsUseCase.execute();

  response.status(HTTP_STATUS.OK).json({
    count: products.length,
    items: products,
  });
};

export default getAllProductsController;
