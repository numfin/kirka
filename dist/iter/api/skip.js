import { createRemapper } from "../middleware/remap.js";
export function skip(skipAmount) {
    return createRemapper(function* (_, source) {
        let skipped = 0;
        let iter = source();
        while (skipped < skipAmount) {
            if (iter.next()) {
                skipped += 1;
            }
            else {
                return;
            }
        }
        for (const item of iter) {
            yield item;
        }
    });
}
