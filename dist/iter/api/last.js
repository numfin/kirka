import { NewOption } from "../../option/index.js";
import { createAggregator } from "../middleware/aggregate.js";
import { fold } from "./fold.js";
export function last() {
    return createAggregator((iter) => {
        return iter.do(fold(NewOption.None(), (_, item) => NewOption.Some(item)));
    });
}
