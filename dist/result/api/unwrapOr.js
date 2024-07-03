import { createAggregator } from "../middleware/aggregate.js";
import { isOk } from "./isOk.js";
export function unwrapOr(default_value) {
    return createAggregator((_, inner) => {
        return isOk(inner) ? inner.value : default_value;
    });
}
