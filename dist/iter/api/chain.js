import { createRemapper } from "../middleware/remap.js";
export function chain(chain) {
    return createRemapper(function* (_, source) {
        for (const item of source()) {
            yield item;
        }
        for (const item of chain) {
            yield item;
        }
    });
}
