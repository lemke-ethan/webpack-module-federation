import { IProduct } from "server"

export declare function getProducts(): Promise<IProduct[]>
export declare function getProductById(id: number): Promise<IProduct>
export declare const currency: Intl.NumberFormat

export type GetProducts = typeof getProducts
export type GetProductById = typeof getProductById
export type Currency = typeof currency