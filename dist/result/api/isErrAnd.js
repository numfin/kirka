import { createAggregator } from "../middleware/aggregate.js";
import { isErr } from "./isErr.js";
export function isErrAnd(fn) {
    return createAggregator((_, inner) => {
        return isErr(inner) && fn(inner.err);
    });
}
