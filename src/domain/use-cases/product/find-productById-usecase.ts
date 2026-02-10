import { EntityNotFoundError } from '@/domain/types/errors';
import type Product from '@domain/entities/Product';
import type ProductRepository from '@domain/repositories/ProductRepository';

export class FindProductByIdUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  public async execute(productId: string): Promise<Product> {
    const product = await this.productRepository.findProductById(productId);
    if (!product) {
      throw new EntityNotFoundError('Product', productId);
    }
    return product;
  }
}
