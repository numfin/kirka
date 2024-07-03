import { createAggregator } from "../middleware/aggregate.js";
import { isSome } from "./is_some.js";
export function formatWith(formatter) {
    return createAggregator((_, inner) => {
        return isSome(inner) ? `Some(${formatter(inner.value)})` : `None`;
    });
}
