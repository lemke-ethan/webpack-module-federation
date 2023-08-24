import { IProduct } from "./product";

export interface ICartItem extends IProduct {
    quantity: number;
}

export interface ICart {
    cartItems: ICartItem[];
}