import { createAggregator } from "../middleware/aggregate.js";
export function all(fn) {
    return createAggregator((iter) => {
        return iter.do((_, source) => {
            for (const item of source()) {
                if (!fn(item)) {
                    return false;
                }
            }
            return true;
        });
    });
}
