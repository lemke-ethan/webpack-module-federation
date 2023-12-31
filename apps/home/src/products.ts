import { GetProductById, GetProducts, Currency } from "home"

const API_SERVER = "http://localhost:8080"

export const getProducts: GetProducts = async () => {
    const response = await fetch(`${API_SERVER}/products`)
    return await response.json()
}

export const getProductById: GetProductById = async (id) => {
    const response = await fetch(`${API_SERVER}/products/${id}`)
    return await response.json()
}

export const currency: Currency = new Intl.NumberFormat(
    "en-US",
    {
        style: "currency",
        currency: "USD"
    }
)