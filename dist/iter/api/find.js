import { createAggregator } from "../middleware/aggregate.js";
import { skipWhile } from "./skip_while.js";
export function find(fn) {
    return createAggregator((iter) => {
        return iter.do(skipWhile((item) => !fn(item))).next();
    });
}
