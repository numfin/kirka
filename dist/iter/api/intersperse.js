import { createRemapper } from "../middleware/remap.js";
export function intersperse(value) {
    return createRemapper(function* (_, source) {
        let firstElementYielded = false;
        for (const item of source()) {
            if (firstElementYielded) {
                yield value;
            }
            yield item;
            firstElementYielded = true;
        }
    });
}
