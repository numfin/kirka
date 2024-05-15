import { None, Some } from "../../option/index.js";
import { createAggregator } from "../middleware/aggregate.js";
export function minBy(cmpFn) {
    return createAggregator((_, source) => {
        let min = None();
        for (const nextMin of source()) {
            min = min
                .map((currentMin) => {
                const nextSmaller = cmpFn(nextMin) < cmpFn(currentMin);
                return nextSmaller ? nextMin : currentMin;
            })
                .or(Some(nextMin));
        }
        return min;
    });
}
