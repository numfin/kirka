import { None, Some } from "../../option/index.js";
import { createAggregator } from "../middleware/aggregate.js";
export function first() {
    return createAggregator((_, source) => {
        for (const item of source()) {
            return Some(item);
        }
        return None();
    });
}
