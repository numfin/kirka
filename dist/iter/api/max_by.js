import { None, Some } from "../../option/index.js";
import { createAggregator } from "../middleware/aggregate.js";
export function maxBy(cmpFn) {
    return createAggregator((_, source) => {
        let max = None();
        for (const nextMax of source()) {
            max = max
                .map((currentMax) => {
                const nextBigger = cmpFn(nextMax) > cmpFn(currentMax);
                return nextBigger ? nextMax : currentMax;
            })
                .or(Some(nextMax));
        }
        return max;
    });
}
