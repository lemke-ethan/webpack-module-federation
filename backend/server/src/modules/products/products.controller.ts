import { Controller, Get, Param } from '@nestjs/common';

import products from '../../products';
import { IProduct } from 'server';

@Controller('products')
export class ProductsController {
  constructor() { }

  @Get()
  async index(): Promise<IProduct[]> {
    return products;
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<IProduct> {
    return products.find((product) => product.id === parseInt(id));
  }
}
