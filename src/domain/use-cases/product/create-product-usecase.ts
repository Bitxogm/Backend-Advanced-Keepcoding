import type Product from '../../entities/Product';
import type ProductRepository from '../../repositories/ProductRepository';

export class CreateProductUseCase {
  readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  public async execute({
    name,
    description,
  }: {
    name: string;
    description: string;
    createdAt?: Date;
  }): Promise<Product> {
    // Validaciones de dominio aquí si es necesario

    // Guardamos el producto en la base de datos y retornamos el resultado
    const savedProduct = await this.productRepository.createOne({ name, description });
    return savedProduct;
  }
}
