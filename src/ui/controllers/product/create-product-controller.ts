import type { Request, Response } from 'express';

import { CreateProductUseCase } from '@/domain/use-cases/product/create-product-usecase';
import { SecurityBcryptService } from '@/infrastructure/services/security-bcrypt-service';
import { ERROR_MESSAGES, HTTP_STATUS } from '@config/constants';
// import { ProductMemoryRepository } from '@infrastructure/repositories/product/product-memory-repository';
import { ProductMongoDbRepository } from '@infrastructure/repositories/product/product-mongodb-repository';

import type { CreateProductDto } from './dto/create-product.dto';

export const createProductController = async (request: Request, response: Response) => {
  const { name, description } = request.body;
  if (!name || !description) {
    response.status(HTTP_STATUS.BAD_REQUEST).json({ message: ERROR_MESSAGES.REQUIRED_FIELDS });
    return;
  }

  const authenticationHeader = request.headers.authorization;

  const token = authenticationHeader?.split(' ')[1];
  if (!authenticationHeader) {
    response.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Unauthorized' });
    return;
  }

  const securityService = new SecurityBcryptService();
  const data = securityService.verifyJWT(token!);
  console.log(data);

  const productData: CreateProductDto = { name, description, userId: data.userId };
  const productMongodbRepository = new ProductMongoDbRepository();
  const createProductUseCase = new CreateProductUseCase(productMongodbRepository);
  // Mapeo explícito del DTO de la capa UI al DTO del dominio
  const savedProduct = await createProductUseCase.execute({
    name: productData.name,
    description: productData.description,
    userId: productData.userId,
  });

  // const productMemoryRepository = new ProductMemoryRepository();
  // const createProductUseCaseMemory = new CreateProductUseCase(productMemoryRepository);
  // const savedProductMemory = await createProductUseCaseMemory.execute({ name, description });

  response.status(HTTP_STATUS.CREATED).json({ item: savedProduct });
  // response.status(HTTP_STATUS.CREATED).json({ item: savedProductMemory });
};
