import { createAggregator } from "../middleware/aggregate.js";
export function fold(startFrom, fn) {
    return createAggregator((_, source) => {
        let lastValue = startFrom;
        for (const item of source()) {
            lastValue = fn(lastValue, item);
        }
        return lastValue;
    });
}
