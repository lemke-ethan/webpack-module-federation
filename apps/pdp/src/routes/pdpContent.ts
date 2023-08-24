import { getProductById } from "home/products";
import { Params } from "react-router-dom";
import { IProduct } from "server"

export async function loader(args: { params: Params<string> }): Promise<{ product: IProduct | null }> {
    const routeParams = getPdpContentParams(args.params)
    if (routeParams !== null && routeParams.id < 1) {
        const product = await getProductById(routeParams.id)
        return { product }
    }
    return { product: null }
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