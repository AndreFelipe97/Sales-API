import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IResponseDeleteProduct {
  message: string;
  product: Product;
}

export default class DeleteProductService {
  public async execute(id: string): Promise<IResponseDeleteProduct> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) throw new AppError('Product not found');

    await productRepository.remove(product);

    return {
      message: 'Product removed successfully',
      product,
    };
  }
}
