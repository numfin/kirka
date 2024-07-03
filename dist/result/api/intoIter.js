import { Iter } from "../../index.js";
import { createAggregator } from "../middleware/aggregate.js";
import { isOk } from "./isOk.js";
export function intoIter() {
    return createAggregator((_, inner) => {
        if (isOk(inner)) {
            return Iter.from([inner.value]);
        }
        return Iter.from([]);
    });
}
