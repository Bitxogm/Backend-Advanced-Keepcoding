import type Product from '@domain/entities/Product';

export interface ProductRepository {
  createOne({ name, description }: { name: string; description: string }): Promise<Product>;
  getAll(): Promise<Product[]>;
  findProductById(id: string): Promise<Product | null>;
  updateOne(
    id: string,
    updateData: { name?: string; description?: string }
  ): Promise<Product | null>;
  deleteOne(id: string): Promise<boolean>;
}

export default ProductRepository;
