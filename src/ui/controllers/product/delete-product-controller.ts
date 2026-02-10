import type { Request, Response } from 'express';

import { DeleteProductUseCase } from '@/domain/use-cases/product/delete-product-usecase';
import { SUCCESS_MESSAGES } from '@config/constants';
import { ProductMongoDbRepository } from '@infrastructure/repositories/product/product-mongodb-repository';


export const deleteProductController = async (
  request: Request<{ productId: string }>,
  response: Response,
  next: (err?: any) => void
) => {
  try {
    const { productId } = request.params;
    const productMongodbRepository = new ProductMongoDbRepository();
    const deleteProductUseCase = new DeleteProductUseCase(productMongodbRepository);
    await deleteProductUseCase.execute(productId);
    response.json({ message: SUCCESS_MESSAGES.PRODUCT_DELETED });
  } catch (error) {
    next(error);
  }
};
