import { createAggregator } from "../middleware/aggregate.js";
export function forEach(fn) {
    return createAggregator((_, source) => {
        for (const item of source()) {
            fn(item);
        }
    });
}
