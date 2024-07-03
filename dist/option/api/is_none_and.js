import { createAggregator } from "../middleware/aggregate.js";
import { isNone } from "./is_none.js";
export function isNoneAnd(fn) {
    return createAggregator((_, inner) => {
        return isNone(inner) && fn();
    });
}
