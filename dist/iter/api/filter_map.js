import { isSome } from "../../option/api/is_some.js";
import { createRemapper } from "../middleware/remap.js";
export function filterMap(fn) {
    return createRemapper(function* (_, source) {
        for (const item of source()) {
            const data = fn(item).inner;
            if (isSome(data)) {
                yield data.value;
            }
        }
    });
}
