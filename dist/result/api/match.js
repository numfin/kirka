import { createAggregator } from "../middleware/aggregate.js";
import { isOk } from "./isOk.js";
export function match(onOk, onErr) {
    return createAggregator((_, inner) => {
        if (isOk(inner)) {
            return onOk(inner.value);
        }
        return onErr(inner.err);
    });
}
