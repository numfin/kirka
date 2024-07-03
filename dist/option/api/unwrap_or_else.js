import { createAggregator } from "../middleware/aggregate.js";
import { isSome } from "./is_some.js";
export function unwrapOrElse(defaultFn) {
    return createAggregator((_, inner) => {
        return isSome(inner) ? inner.value : defaultFn();
    });
}
