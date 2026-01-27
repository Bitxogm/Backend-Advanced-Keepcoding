//Creamos router de express para tener todos los endpoints relacionados con productos en un solo archivo
import type { Request, Response } from 'express';
import express from 'express';

import Product from '../models/product';

interface CreateProductBody {
  name: string;
  description: string;
}

const productRouter: express.Router= express.Router();

// Endpoint to get all products
productRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  const products = await Product.find();
  res.json({
    count: products.length,
    items: products
  });
});

productRouter.get('/:productId', async (req: Request<{ productId: string }>, res: Response): Promise<void> => {
  const productId = req.params.productId;

  const product = await Product.findById(productId);

  if(product){
    res.json({
      count: product ? 1 : 0,
      items: product ? [product] : []
    });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }

});

productRouter.post('/', async (req: Request<{}, {}, CreateProductBody>, res: Response): Promise<void> => {
  const { name, description } = req.body;

  if(!name || !description) {
    res.status(400).json({ message: 'Name and description are required' });
    return;
  }

  const newProduct = new Product({
    name,
    description
  });

  const savedProduct = await newProduct.save();

  res.status(201).json({ item: savedProduct });
});

productRouter.patch('/:productId', async (req: Request<{ productId: string }, {}, CreateProductBody>, res: Response): Promise<void> => {
  
  // Sacamos de la peticion todos los datos que necesitamos para trabajar con ellos
  const { productId } = req.params;
  const { name, description } = req.body;

  const updatedProduct = await Product.findByIdAndUpdate(productId, { name, description }, { new: true });

  if(updatedProduct){
    res.json({ item: updatedProduct });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

productRouter.delete('/:productId', async (req: Request<{ productId: string }>, res: Response): Promise<void> => {
  const { productId } = req.params;

  const deletedProduct = await Product.findByIdAndDelete(productId);

  if(deletedProduct){
    res.json({ message: 'Product deleted successfully' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

export default productRouter;