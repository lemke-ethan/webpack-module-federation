import {
  Controller,
  Get,
  Request,
  UseGuards,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import products from '../../products';
import { ICart } from 'server';

const initialCart = (indexes: number[]): ICart => ({
  cartItems: indexes.map((index) => ({
    ...products[index],
    quantity: 1,
  })),
});

@Controller('cart')
export class CartController {
  private carts: Record<number, ICart> = {
    1: initialCart([0, 2, 4]),
    2: initialCart([1, 3]),
  };

  constructor() { }

  @Get()
  @UseGuards(JwtAuthGuard)
  async index(@Request() req): Promise<ICart> {
    return this.carts[req.user.userId] ?? { cartItems: [] };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() { id }: { id: string }): Promise<ICart> {
    const cart = this.carts[req.user.userId];
    const cartItem = cart.cartItems.find(
      (cartItem) => cartItem.id === parseInt(id),
    );
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.cartItems.push({
        ...products.find((product) => product.id === parseInt(id)),
        quantity: 1,
      });
    }
    return cart;
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async destroy(@Request() req): Promise<ICart> {
    this.carts[req.user.userId] = { cartItems: [] };
    return this.carts[req.user.userId];
  }
}
