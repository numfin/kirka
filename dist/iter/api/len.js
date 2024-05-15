import { createAggregator } from "../middleware/aggregate.js";
export function len() {
    return createAggregator((_, source) => {
        let length = 0;
        for (const _ of source()) {
            length += 1;
        }
        return length;
    });
}
