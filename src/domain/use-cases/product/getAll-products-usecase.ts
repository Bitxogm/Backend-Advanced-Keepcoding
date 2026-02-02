import type Product from '@domain/entities/Product';
import type ProductRepository from '@domain/repositories/ProductRepository';

export class GetAllProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  public async execute(): Promise<Product[]> {
    const products = await this.productRepository.getAll();
    return products;
  }
}
