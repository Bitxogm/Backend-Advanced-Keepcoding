import type { Request, Response } from 'express';

import { ERROR_MESSAGES, HTTP_STATUS } from '../../../config/constants';
import { CreateProductUseCase } from '../../../domain/use-cases/product/create-product-usecase';
import { ProductMongoDbRepository } from '../../../infrastructure/repositories/product';

export const createProductController = async (request: Request, response: Response) => {
  const { name, description } = request.body;

  if (!name || !description) {
    response.status(HTTP_STATUS.BAD_REQUEST).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
    return;
  }

  const productMongodbRepository = new ProductMongoDbRepository();
  const createProductUseCase = new CreateProductUseCase(productMongodbRepository);
  const savedProduct = await createProductUseCase.execute({ name, description });

  response.status(HTTP_STATUS.CREATED).json({ item: savedProduct });
};
