import type Product from '@domain/entities/Product';

import type { ProductCreateQuery } from '../types/ProductCreateQuery';
import type { ProductUpdateQuery } from '../types/ProductUpdateQuery';

export interface ProductRepository {
  createOne(productData: ProductCreateQuery): Promise<Product>;
  getAll(): Promise<Product[]>;
  findProductById(id: string): Promise<Product | null>;
  updateOne(id: string, updateData: ProductUpdateQuery): Promise<Product | null>;
  deleteOne(id: string): Promise<boolean>;
}

export default ProductRepository;
