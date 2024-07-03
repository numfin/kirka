import { createAggregator } from "../middleware/aggregate.js";
import { isSome } from "./is_some.js";
export function isSomeAnd(fn) {
    return createAggregator((_, inner) => {
        return isSome(inner) && fn(inner.value);
    });
}
