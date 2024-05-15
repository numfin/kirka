import { createAggregator } from "../middleware/aggregate.js";
import { filterMap } from "./filter_map.js";
export function findMap(fn) {
    return createAggregator((iter) => {
        return iter.do(filterMap(fn)).next();
    });
}
