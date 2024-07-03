import { createAggregator } from "../middleware/aggregate.js";
import { isErr } from "./isErr.js";
import { isOk } from "./isOk.js";
export function eq(other) {
    return createAggregator((_, inner) => {
        if (isOk(inner) && inner.type === other.inner.type) {
            return inner.value === other.inner.value;
        }
        if (isErr(inner) && inner.type === other.inner.type) {
            return inner.err === other.inner.err;
        }
        return false;
    });
}
