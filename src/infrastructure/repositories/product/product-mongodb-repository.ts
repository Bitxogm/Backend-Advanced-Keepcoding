import Product from '@domain/entities/Product';
import type ProductRepository from '@domain/repositories/ProductRepository';
import type { ProductCreateQuery } from '@domain/types/ProductCreateQuery';
import type { ProductUpdateQuery } from '@domain/types/ProductUpdateQuery';
import ProductModel from '@infrastructure/models/product-model';

export class ProductMongoDbRepository implements ProductRepository {
  async updateOne(id: string, updateData: ProductUpdateQuery): Promise<Product | null> {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return null;
    }

    return new Product({
      id: updatedProduct._id.toString(),
      name: updatedProduct.name,
      description: updatedProduct.description,
      createdAt: updatedProduct.createdAt,
    });
  }
  async deleteOne(id: string): Promise<boolean> {
    const result = await ProductModel.findByIdAndDelete(id);
    return result !== null;
  }

  async findProductById(id: string): Promise<Product | null> {
    const productModel = await ProductModel.findById(id);

    if (!productModel) {
      return null;
    }

    return new Product({
      id: productModel._id.toString(),
      name: productModel.name,
      description: productModel.description,
      createdAt: productModel.createdAt,
    });
  }

  async createOne(productData: ProductCreateQuery): Promise<Product> {
    const newProductModel = new ProductModel(productData);
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
