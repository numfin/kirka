import { None, Some } from "../../option/index.js";
import { createAggregator } from "../middleware/aggregate.js";
import { fold } from "./fold.js";
export function last() {
    return createAggregator((iter) => {
        return iter.do(fold(None(), (_, item) => Some(item)));
    });
}
