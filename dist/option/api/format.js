import { createAggregator } from "../middleware/aggregate.js";
import { isSome } from "./is_some.js";
export function format() {
    return createAggregator((_, inner) => {
        return isSome(inner) ? `Some(${inner.value})` : `None`;
    });
}
