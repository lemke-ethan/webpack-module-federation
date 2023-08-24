import React, { useEffect, useState } from "react"
import { getProductById, currency } from "home/products";
import { IProduct } from "server";

export function PdpContent() {
    const productId = 1
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
    return <div className="pdp-content">Product {productId}</div>
}