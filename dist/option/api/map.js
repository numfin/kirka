import { NewOption } from "../../index.js";
import { createRemapper } from "../middleware/remap.js";
export function map(fn) {
    return createRemapper((_, inner) => {
        if (inner.type === "Some") {
            return NewOption.Some(fn(inner.value));
        }
        return NewOption.None();
    });
}
