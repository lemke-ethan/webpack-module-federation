import { IProduct } from "server";
import { isNotFalsyObject } from "./utils/objects";

export function isIProduct(value: any): value is IProduct {
    return (
        isNotFalsyObject(value) &&
        typeof value.id === "number" &&
        typeof value.name === "string" &&
        typeof value.price === "number" &&
        typeof value.description === "string" &&
        typeof value.longDescription === "string" &&
        typeof value.image === "string"
    )
}