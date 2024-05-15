import { createRemapper } from "../middleware/remap.js";
export function takeWhile(condition) {
    return createRemapper(function* (_, source) {
        for (const item of source()) {
            if (condition(item)) {
                yield item;
            }
            else {
                return;
            }
        }
    });
}
