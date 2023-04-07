import { IterFrom } from "../from/index.js";
export function reverse(source) {
    return IterFrom.array(Array.from(source).reverse());
}
