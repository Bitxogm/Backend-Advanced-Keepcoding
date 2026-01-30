import Product from '../../../domain/entities/Product';
import type ProductRepository from '../../../domain/repositories/ProductRepository';
import ProductModel from '../../models/product-model';

export class ProductMongoDbRepository implements ProductRepository {
  async createOne({ name, description }: { name: string; description: string }): Promise<Product> {
    const newProductModel = new ProductModel({
      name,
      description,
    });

    const savedProduct = await newProductModel.save();

    // Convertimos el modelo de Mongoose a la entidad de dominio
    return new Product({
      id: savedProduct._id.toString(),
      name: savedProduct.name,
      description: savedProduct.description,
      createdAt: savedProduct.createdAt,
    });
  }

  async getAll(): Promise<Product[]> {
    const productsFromDb = await ProductModel.find();

    // Convertimos los modelos de Mongoose a entidades de dominio
    return productsFromDb.map(
      productModel =>
        new Product({
          id: productModel._id.toString(),
          name: productModel.name,
          description: productModel.description,
          createdAt: productModel.createdAt,
        })
    );
  }
}
