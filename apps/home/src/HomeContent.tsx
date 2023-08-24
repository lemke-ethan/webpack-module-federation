import "./styles/HomeContent.css"
import React, { useEffect, useState } from "react";
import { IProduct } from "server";
import { getProducts } from "./products";

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
                </div>
            ))}
        </div>
    )
}