import { map } from "../../option/api/map.js";
import { or } from "../../option/api/or.js";
import { NewOption } from "../../option/index.js";
import { createAggregator } from "../middleware/aggregate.js";
export function minBy(cmpFn) {
    return createAggregator((_, source) => {
        let min = NewOption.None();
        for (const nextMin of source()) {
            min = min
                .do(map((currentMin) => {
                const nextSmaller = cmpFn(nextMin) < cmpFn(currentMin);
                return nextSmaller ? nextMin : currentMin;
            }))
                .do(or(NewOption.Some(nextMin)));
        }
        return min;
    });
}
