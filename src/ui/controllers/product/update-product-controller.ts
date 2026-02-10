import type { Request, Response } from 'express';

import { UpdateProductUseCase } from '@/domain/use-cases/product/update-product-usecase';
import { ProductMongoDbRepository } from '@infrastructure/repositories/product/product-mongodb-repository';

import type { UpdateProductDto } from './dto/update-product.dto';

export const UpdateProductController = async (
  request: Request<{ productId: string }>,
  response: Response,
  next: (err?: any) => void
) => {
  try {
    const productId = request.params.productId;
    const { name, description } = request.body;
    const updateData: UpdateProductDto = { name, description };
    const productMongodbRepository = new ProductMongoDbRepository();
    const updateProductUseCase = new UpdateProductUseCase(productMongodbRepository);
    const updatedProduct = await updateProductUseCase.execute(productId, {
      name: updateData.name,
      description: updateData.description,
    });
    response.json({ item: updatedProduct });
  } catch (error) {
    next(error);
  }
};
