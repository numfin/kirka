import { createRemapper } from "../middleware/remap.js";
export function skipWhile(filter) {
    return createRemapper(function* (_, source) {
        let flag = false;
        for (const item of source()) {
            if (flag || !filter(item)) {
                flag = true;
                yield item;
            }
        }
    });
}
