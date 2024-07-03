import { createRemapper } from "../middleware/remap.js";
import { andThen } from "./and_then.js";
export function flatten() {
    return createRemapper((option) => {
        return option.do(andThen((v) => v));
    });
}
