import { createAggregator } from "../middleware/aggregate.js";
import { isErr } from "./isErr.js";
export function unwrapErrOr(defaultErr) {
    return createAggregator((_, inner) => {
        return isErr(inner) ? inner.err : defaultErr;
    });
}
