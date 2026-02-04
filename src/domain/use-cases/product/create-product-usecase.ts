import type { ProductCreateQuery } from '@/domain/types/ProductCreateQuery';
import type Product from '@domain/entities/Product';
import type ProductRepository from '@domain/repositories/ProductRepository';

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  public async execute(productData: ProductCreateQuery): Promise<Product> {
    // Validaciones de dominio aquí si es necesario
    // Guardamos el producto en la base de datos y retornamos el resultado
    const savedProduct = await this.productRepository.createOne(productData);
    return savedProduct;
  }
}
