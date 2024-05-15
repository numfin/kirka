import { createAggregator } from "../middleware/aggregate.js";
export function isEmpty() {
    return createAggregator((_, source) => {
        for (const _ of source()) {
            return false;
        }
        return true;
    });
}
