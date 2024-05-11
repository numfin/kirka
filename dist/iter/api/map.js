import { createRemapper } from "../middleware/remap.js";
export function map(fn) {
    return createRemapper(function* (_, source) {
        for (const item of source()) {
            yield fn(item);
        }
    });
}
