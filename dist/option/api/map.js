import { unionNone } from "./unionNone";
import { unionSome } from "./unionSome";
import { unwrap } from "./unwrap";
export function map(option, fn) {
    const inner = option.inner();
    if (inner.type === "Some") {
        return unionSome(fn(unwrap(option)));
    }
    return unionNone();
}
