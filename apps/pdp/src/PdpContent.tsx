import "./styles/PdpContent.css"
import React from "react"
import { currency } from "home/products";
import { IProduct } from "server";
import { useLoaderData } from "react-router-dom";
import { isIProduct } from "@wmf/type-guards";

export function PdpContent() {
    const product = useProductFromRouteData()

    if (product === null) { return <div className="pdp-content">Product not found</div> }
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

/**
 * Gets the loaded product. Returns `null` if the product failed to load.
 * 
 * Because this function is relative to the current route, it makes sense to keep it in the routes component.
 */
export function useProductFromRouteData(): IProduct | null {
    const result = useLoaderData()
    if (isIProduct(result) || result === null) {
        return result
    }
    return null
}