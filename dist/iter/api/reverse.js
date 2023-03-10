import { IterFrom } from "../from";
export function reverse(source) {
    return IterFrom.array(Array.from(source).reverse());
}
