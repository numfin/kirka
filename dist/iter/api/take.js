import { createRemapper } from "../middleware/remap.js";
export function take(takeAmount) {
    return createRemapper(function* (_, source) {
        let i = 0;
        for (const item of source()) {
            if (i++ < takeAmount) {
                yield item;
            }
            else {
                return;
            }
        }
    });
}
