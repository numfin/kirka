import { createRemapper } from "../middleware/remap.js";
export function flatMap(fn) {
    return createRemapper(function* (_, source) {
        for (const item of source()) {
            for (const subItem of fn(item)) {
                yield subItem;
            }
        }
    });
}
