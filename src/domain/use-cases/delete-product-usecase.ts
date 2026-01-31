import type ProductRepository from '@domain/repositories/ProductRepository';

export class DeleteProductUseCase {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  public async execute(id: string): Promise<boolean> {
    const existingProduct = await this.productRepository.findProductById(id);
    if (!existingProduct) {
      return false;
    }

    const deleted = await this.productRepository.deleteOne(id);
    return deleted;
  }
}
