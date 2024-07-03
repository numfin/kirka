import { createAggregator } from "../middleware/aggregate.js";
import { isOk } from "./isOk.js";
export function isOkAnd(fn) {
    return createAggregator((_, inner) => {
        return isOk(inner) && fn(inner.value);
    });
}
