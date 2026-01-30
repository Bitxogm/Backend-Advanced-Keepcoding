import Product from '../../../domain/entities/Product';
import type ProductRepository from '../../../domain/repositories/ProductRepository';

export class ProductMemoryRepository implements ProductRepository {
  readonly products: Product[] = [];
  constructor() {
    // Inicializar con algunos productos de ejemplo si es necesario
    this.products = [];
  }

  async createOne({ name, description }: { name: string; description: string }): Promise<Product> {
    const product = new Product({
      name,
      description,
      id: Date.now().toString(),
      createdAt: new Date(),
    });
    this.products.push(product);
    return Promise.resolve(product);
  }

  async getAll(): Promise<Product[]> {
    return Promise.resolve(this.products);
  }
}
