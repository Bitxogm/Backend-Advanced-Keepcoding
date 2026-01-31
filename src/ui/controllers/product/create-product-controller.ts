import type { Request, Response } from 'express';

import { ERROR_MESSAGES, HTTP_STATUS } from '@config/constants';
import { CreateProductUseCase } from '@domain/use-cases/create-product-usecase';
// import { ProductMemoryRepository } from '@infrastructure/repositories/product/product-memory-repository';
import { ProductMongoDbRepository } from '@infrastructure/repositories/product/product-mongodb-repository';

export const createProductController = async (request: Request, response: Response) => {
  const { name, description } = request.body;

  if (!name || !description) {
    response.status(HTTP_STATUS.BAD_REQUEST).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
    return;
  }

  const productMongodbRepository = new ProductMongoDbRepository();
  const createProductUseCase = new CreateProductUseCase(productMongodbRepository);
  const savedProduct = await createProductUseCase.execute({ name, description });

  // const productMemoryRepository = new ProductMemoryRepository();
  // const createProductUseCaseMemory = new CreateProductUseCase(productMemoryRepository);
  // const savedProductMemory = await createProductUseCaseMemory.execute({ name, description });

  response.status(HTTP_STATUS.CREATED).json({ item: savedProduct });
  // response.status(HTTP_STATUS.CREATED).json({ item: savedProductMemory });
};
