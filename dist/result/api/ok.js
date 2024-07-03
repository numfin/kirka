import { NewOption } from "../../option/index.js";
import { createAggregator } from "../middleware/aggregate.js";
import { isOk } from "./isOk.js";
export function ok() {
    return createAggregator((_, inner) => {
        return isOk(inner) ? NewOption.Some(inner.value) : NewOption.None();
    });
}
