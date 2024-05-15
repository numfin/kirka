import { createAggregator } from "../middleware/aggregate.js";
export function toSet() {
    return createAggregator((_, source) => {
        return new Set(source());
    });
}
