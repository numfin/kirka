import { createAggregator } from "../middleware/aggregate.js";
export function nthMut(amount) {
    if (amount < 0) {
        throw new Error(`Cannot iterate ${amount} times`);
    }
    return createAggregator((iter) => {
        for (let i = 0; i < amount; i++) {
            iter.next();
        }
        return iter.next();
    });
}
