import { map } from "../../option/api/map.js";
import { or } from "../../option/api/or.js";
import { NewOption } from "../../option/index.js";
import { createAggregator } from "../middleware/aggregate.js";
export function maxBy(cmpFn) {
    return createAggregator((_, source) => {
        let max = NewOption.None();
        for (const nextMax of source()) {
            max = max
                .do(map((currentMax) => {
                const nextBigger = cmpFn(nextMax) > cmpFn(currentMax);
                return nextBigger ? nextMax : currentMax;
            }))
                .do(or(NewOption.Some(nextMax)));
        }
        return max;
    });
}
