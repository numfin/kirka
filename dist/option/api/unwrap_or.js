import { createAggregator } from "../middleware/aggregate.js";
import { isSome } from "./is_some.js";
export function unwrapOr(defaultValue) {
    return createAggregator((_, inner) => {
        return isSome(inner) ? inner.value : defaultValue;
    });
}
