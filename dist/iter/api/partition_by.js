import { createAggregator } from "../middleware/aggregate.js";
export function partitionBy(fn) {
    return createAggregator((_, source) => {
        const collectionA = [];
        const collectionB = [];
        for (const item of source()) {
            if (fn(item)) {
                collectionA.push(item);
            }
            else {
                collectionB.push(item);
            }
        }
        return [collectionA, collectionB];
    });
}
