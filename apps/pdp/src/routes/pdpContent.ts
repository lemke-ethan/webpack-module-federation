import { getProductById } from "home/products";
import { Params, useLoaderData } from "react-router-dom";
import { IProduct } from "server"

/** Loads the product by its ID. Defaults to `null` if the product could not be loaded. */
export async function productLoader(args: { params: Params<string> }): Promise<IProduct | null> {
    const routeParams = getPdpContentParams(args.params)
    if (routeParams !== null && routeParams.id > 0) {
        const product = await getProductById(routeParams.id)
        return product
    }
    return null
}

type PdpContentParams = {
    id: number
}
function getPdpContentParams(params: Params<string>): PdpContentParams | null {
    if (
        !("id" in params) ||
        params.id === undefined
    ) { return null }
    const parsedId = Number.parseInt(params.id)
    if (isNaN(parsedId)) { return null }
    return {
        id: parsedId
    }
}