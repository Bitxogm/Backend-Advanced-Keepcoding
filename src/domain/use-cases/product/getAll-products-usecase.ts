import type Product from '../../entities/Product';
import type ProductRepository from '../../repositories/ProductRepository';

export class GetAllProductsUseCase {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  public async execute(): Promise<Product[]> {
    const products = await this.productRepository.getAll();
    return products;
  }
}
