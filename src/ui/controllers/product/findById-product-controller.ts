import type { Request, Response } from 'express';

import { FindProductByIdUseCase } from '@/domain/use-cases/product/find-productById-usecase';
import { ERROR_MESSAGES, HTTP_STATUS } from '@config/constants';
import { ProductMongoDbRepository } from '@infrastructure/repositories/product/product-mongodb-repository';

export const findByIdProductController = async (
  request: Request<{ productId: string }>,
  response: Response,
  next: (err?: any) => void
) => {
  try {
    const productId = request.params.productId;

    const productMongodbRepository = new ProductMongoDbRepository();
    const findProductByIdUseCase = new FindProductByIdUseCase(productMongodbRepository);

    const product = await findProductByIdUseCase.execute(productId);

    if (product) {
      response.json({
        count: product ? 1 : 0,
        items: product ? [product] : [],
      });
    } else {
      response.status(HTTP_STATUS.NOT_FOUND).json({ message: ERROR_MESSAGES.PRODUCT_NOT_FOUND });
    }
  } catch (error) {
    next(error);
  }
};
