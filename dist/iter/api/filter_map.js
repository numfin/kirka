import { createRemapper } from "../middleware/remap.js";
export function filterMap(fn) {
    return createRemapper(function* (_, source) {
        for (const item of source()) {
            const data = fn(item).inner();
            if (data.type === "Some") {
                yield data.value;
            }
        }
    });
}
