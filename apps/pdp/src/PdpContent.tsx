import "./styles/PdpContent.css"
import React, { useEffect, useState } from "react"
import { getProductById, currency } from "home/products";
import { IProduct } from "server";
import { useLoaderData } from "react-router-dom";

export function PdpContent() {
    // TODO: finish getting the route params, validating them and using them
    const productId = useLoaderData()
    const [product, setProduct] = useState<IProduct | null>(null)

    useEffect(() => {
        (async function fetchProduct() {
            if (productId > 0) {
                const product = await getProductById(productId)
                setProduct(product)
            }
            else {
                setProduct(null)
            }
        })().catch(console.error)
    }, [product])

    if (product === null) { return }
    return (
        <div className="pdp-content">
            <div>
                <img className="product-image" src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
                <h1 className="product-name">
                    {product.name}
                </h1>
                <div className="product-price">
                    {currency.format(product.price)}
                </div>
                <div className="product-description">
                    {product.description}
                </div>
                <div className="product-long-description">
                    {product.longDescription}
                </div>
            </div>
        </div>
    )
}