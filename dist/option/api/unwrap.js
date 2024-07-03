import { isNone } from "./is_none.js";
export function unwrap(inner) {
    if (isNone(inner)) {
        throw new Error(`unwrap called on None`);
    }
    return inner.value;
}
