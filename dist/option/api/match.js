import { createAggregator } from "../middleware/aggregate.js";
import { isSome } from "./is_some.js";
export function match(onSome, onNone) {
    return createAggregator((_, inner) => {
        if (isSome(inner)) {
            return onSome(inner.value);
        }
        return onNone();
    });
}
