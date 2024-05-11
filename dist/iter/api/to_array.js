import { createAggregator } from "../middleware/aggregate.js";
export function toArray() {
    return createAggregator((_, source) => {
        return Array.from(source());
    });
}
