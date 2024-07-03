import { NewOption } from "../../option/index.js";
import { createAggregator } from "../middleware/aggregate.js";
import { isErr } from "./isErr.js";
export function err() {
    return createAggregator((_, inner) => {
        return isErr(inner) ? NewOption.Some(inner.err) : NewOption.None();
    });
}
