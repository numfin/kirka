import { unionNone } from "./unionNone.js";
import { unionSome } from "./unionSome.js";
import { unwrap } from "./unwrap.js";
export function map(option, fn) {
    const inner = option.inner();
    if (inner.type === "Some") {
        return unionSome(fn(unwrap(option)));
    }
    return unionNone();
}
