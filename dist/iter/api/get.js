import { None } from "../../option/index.js";
import { createAggregator } from "../middleware/aggregate.js";
import { first } from "./first.js";
import { skip } from "./skip.js";
export function get(index) {
    return createAggregator((iter) => {
        if (index < 0) {
            return None();
        }
        return iter.do(skip(index)).do(first());
    });
}
