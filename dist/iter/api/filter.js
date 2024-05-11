import { createRemapper } from "../middleware/remap.js";
export function filter(fn) {
    return createRemapper(function* (_, source) {
        for (const item of source()) {
            if (fn(item)) {
                yield item;
            }
        }
    });
}
