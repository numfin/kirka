import { Iter } from "../index.js";
import { createAggregator } from "../middleware/aggregate.js";
export function reverse() {
    return createAggregator((_, source) => {
        return Iter.from(Array.from(source()).reverse());
    });
}
