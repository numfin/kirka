import { createRemapper } from "../middleware/remap.js";
import { isOk } from "./isOk.js";
export function inspect(fn) {
    return createRemapper((result, inner) => {
        if (isOk(inner)) {
            fn(inner.value);
        }
        return result;
    });
}
