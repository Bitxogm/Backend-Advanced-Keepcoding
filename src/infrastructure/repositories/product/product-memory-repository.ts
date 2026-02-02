import Product from '@domain/entities/Product';
import type ProductRepository from '@domain/repositories/ProductRepository';
import type { ProductCreateQuery } from '@domain/types/ProductCreateQuery';
import type { ProductUpdateQuery } from '@domain/types/ProductUpdateQuery';

export class ProductMemoryRepository implements ProductRepository {
  readonly products: Product[] = [];
  constructor() {
    // Inicializar con algunos productos de ejemplo si es necesario
    this.products = [];
  }
  async updateOne(id: string, updateData: ProductUpdateQuery): Promise<Product | null> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      return Promise.resolve(null);
    }

    const product = this.products[index];
    if (updateData.name !== undefined) {
      product.name = updateData.name;
    }
    if (updateData.description !== undefined) {
      product.description = updateData.description;
    }

    return Promise.resolve(product);
  }

  async deleteOne(id: string): Promise<boolean> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      return Promise.resolve(false);
    }

    this.products.splice(index, 1);
    return Promise.resolve(true);
  }

  async findProductById(id: string): Promise<Product | null> {
    const product = this.products.find(p => p.id === id);
    return Promise.resolve(product || null);
  }
  async createOne(productData: ProductCreateQuery): Promise<Product> {
    const product = new Product({
      ...productData,
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
