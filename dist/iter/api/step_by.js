import { createRemapper } from "../middleware/remap.js";
export function stepBy(amount) {
    if (amount <= 0) {
        throw new Error(`stepBy() amount should be > 0`);
    }
    return createRemapper(function* (_, source) {
        let counter = 0;
        for (const item of source()) {
            if (counter % amount === 0) {
                yield item;
                counter = 0; // workaround over Number.MAX_SAFE_INTEGER limit
            }
            counter += 1;
        }
    });
}
