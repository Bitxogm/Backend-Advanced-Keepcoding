import type { Request, Response } from 'express';

import { UpdateProductUseCase } from '@/domain/use-cases/product/update-product-usecase';
import { ERROR_MESSAGES, HTTP_STATUS } from '@config/constants';
import { ProductMongoDbRepository } from '@infrastructure/repositories/product/product-mongodb-repository';

import type { UpdateProductDto } from './dto/update-product.dto';

export const UpdateProductController = async (
  request: Request<{ productId: string }>,
  response: Response
) => {
  try {
    const productId = request.params.productId;

    const { name, description } = request.body;
    const updateData: UpdateProductDto = { name, description };
    const productMongodbRepository = new ProductMongoDbRepository();
    const updateProductUseCase = new UpdateProductUseCase(productMongodbRepository);
    // Mapeo explícito del DTO de la capa UI al DTO del dominio
    const updatedProduct = await updateProductUseCase.execute(productId, {
      name: updateData.name,
      description: updateData.description,
    });

    if (updatedProduct) {
      response.json({ item: updatedProduct });
    } else {
      response.status(HTTP_STATUS.NOT_FOUND).json({ message: ERROR_MESSAGES.PRODUCT_NOT_FOUND });
    }
  } catch (error) {
    response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
