import { IProduct } from "server"

const API_SERVER = "http://localhost:8080"

export async function getProducts(): Promise<IProduct[]> {
    const response = await fetch(`${API_SERVER}/products`)
    return await response.json()
}

export async function getProductById(id: number): Promise<IProduct> {
    const response = await fetch(`${API_SERVER}/products/${id}`)
    return await response.json()
}

export const currency = new Intl.NumberFormat(
    "en-US",
    {
        style: "currency",
        currency: "USD"
    }
)