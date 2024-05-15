import { createRemapper } from "../middleware/remap.js";
export function enumerate() {
    return createRemapper(function* (_, source) {
        let index = 0;
        for (const item of source()) {
            yield { item, index };
            index += 1;
        }
    });
}
