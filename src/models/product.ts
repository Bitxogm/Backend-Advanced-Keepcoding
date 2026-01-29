import type { Document } from 'mongoose';
import mongoose from 'mongoose';

// Importamos mongoose y Document para definir la interfaz del producto y tener metodos de mongoose disponibles.
export interface IProduct extends Document {
  name: string;
  description: string;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    // price: {
    //   type: Number,
    //   required: true
    // },
    description: {
      type: String,
      required: true,
    },
  },
  {
    // Añadimos timestamps para tener createdAt y updatedAt automáticamente
    timestamps: true,
  }
);

const Product = mongoose.model<IProduct>('Product', productSchema, 'products');

export default Product;
