import { createAggregator } from "../middleware/aggregate.js";
import { isNone } from "./is_none.js";
import { isSome } from "./is_some.js";
export function eq(other, by = (x) => x) {
    return createAggregator((_, inner) => {
        if (isSome(inner) && isSome(other.inner)) {
            return by(inner.value) === by(other.inner.value);
        }
        return isNone(inner) && isNone(other.inner);
    });
}
