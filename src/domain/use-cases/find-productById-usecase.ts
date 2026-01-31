import type Product from '@domain/entities/Product';
import type ProductRepository from '@domain/repositories/ProductRepository';

export class FindProductByIdUseCase {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  public async execute(id: string): Promise<Product | null> {
    const product = await this.productRepository.findProductById(id);
    return product;
  }
}
