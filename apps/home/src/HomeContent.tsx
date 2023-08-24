import "./styles/HomeContent.css"
import React, { useEffect, useState } from "react";
import { IProduct } from "server";
import { currency, getProducts } from "./products";

export function HomeContent() {
    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(() => {
        ; (async function fetchAllProducts() {
            const products = await getProducts()
            setProducts(products)
        })().catch(console.error)
    }, [])

    return (
        <div className="home-content">
            {products.map(product => (
                <div className="product" key={product.id}>
                    <img className="product-image" src={product.image} alt={product.name} />
                    <div className="product-info">
                        <div className="product-name">
                            <a>{product.name}</a>
                        </div>
                        <div className="product-price">
                            {currency.format(product.price)}
                        </div>
                        <div className="product-description">
                            {product.description}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}