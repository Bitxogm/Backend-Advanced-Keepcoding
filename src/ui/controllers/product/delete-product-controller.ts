import type { Request, Response } from 'express';

import { ERROR_MESSAGES, HTTP_STATUS, SUCCESS_MESSAGES } from '@config/constants';
import { DeleteProductUseCase } from '@domain/use-cases/delete-product-usecase';
import { ProductMongoDbRepository } from '@infrastructure/repositories/product/product-mongodb-repository';

export const deleteProductController = async (
  request: Request<{ productId: string }>,
  response: Response
) => {
  try {
    const { productId } = request.params;

    const productMongodbRepository = new ProductMongoDbRepository();
    const deleteProductUseCase = new DeleteProductUseCase(productMongodbRepository);
    const wasDeleted = await deleteProductUseCase.execute(productId);

    if (wasDeleted) {
      response.json({ message: SUCCESS_MESSAGES.PRODUCT_DELETED });
    } else {
      response.status(HTTP_STATUS.NOT_FOUND).json({ message: ERROR_MESSAGES.PRODUCT_NOT_FOUND });
    }
  } catch (error) {
    console.error('Error in deleteProductController:', error);
    response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
