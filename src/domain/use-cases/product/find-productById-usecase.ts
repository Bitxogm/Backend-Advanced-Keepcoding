import type Product from '@domain/entities/Product';
import type ProductRepository from '@domain/repositories/ProductRepository';

export class FindProductByIdUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  public async execute(productId: string): Promise<Product | null> {
    const product = await this.productRepository.findProductById(productId);
    return product;
  }
}
