import type { ProductUpdateQuery } from '@/domain/types/ProductUpdateQuery';
import { EntityNotFoundError } from '@/domain/types/errors';
import type Product from '@domain/entities/Product';
import type ProductRepository from '@domain/repositories/ProductRepository';

export class UpdateProductUseCase {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  public async execute(productId: string, updateData: ProductUpdateQuery): Promise<Product | null> {
    const existingProduct = await this.productRepository.findProductById(productId);
    if (!existingProduct) {
      throw new EntityNotFoundError('Product', productId);
    }

    const updatedProductData: ProductUpdateQuery = {
      name: updateData.name ?? existingProduct.name,
      description: updateData.description ?? existingProduct.description,
    };

    const updatedProduct = await this.productRepository.updateOne(productId, updatedProductData);
    return updatedProduct;
  }
}
