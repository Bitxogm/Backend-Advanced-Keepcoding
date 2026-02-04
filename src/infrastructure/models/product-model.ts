import type { Document } from 'mongoose';
import mongoose from 'mongoose';

// Importamos mongoose y Document para definir la interfaz del producto y tener metodos de mongoose disponibles.
export interface IProduct extends Document {
  name: string;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<IProduct>('Product', productSchema, 'products');

export default ProductModel;
