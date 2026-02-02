import type ProductRepository from '@domain/repositories/ProductRepository';

export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  public async execute(productId: string): Promise<boolean> {
    const existingProduct = await this.productRepository.findProductById(productId);
    if (!existingProduct) {
      return false;
    }

    const deleted = await this.productRepository.deleteOne(productId);
    return deleted;
  }
}
