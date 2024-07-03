import { createRemapper } from "../middleware/remap.js";
import { isErr } from "./isErr.js";
export function inspectErr(fn) {
    return createRemapper((result, inner) => {
        if (isErr(inner)) {
            fn(inner.err);
        }
        return result;
    });
}
