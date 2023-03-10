import { unionNone } from "./unionNone";
import { unionSome } from "./unionSome";
import { unwrap } from "./unwrap";
export function map(option, fn) {
    if (option.type === "Some") {
        return unionSome(fn(unwrap(option)));
    }
    return unionNone();
}
