import type Product from '@domain/entities/Product';
import type ProductRepository from '@domain/repositories/ProductRepository';

export class UpdateProductUseCase {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  public async execute(
    id: string,
    updateData: { name?: string; description?: string }
  ): Promise<Product | null> {
    const existingProduct = await this.productRepository.findProductById(id);
    if (!existingProduct) {
      return null; // O lanzar una excepción si prefieres
    }

    const updatedProductData = {
      name: updateData.name ?? existingProduct.name,
      description: updateData.description ?? existingProduct.description,
    };

    const updatedProduct = await this.productRepository.updateOne(id, updatedProductData);
    return updatedProduct;
  }
}
