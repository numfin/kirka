import { NewOption } from "../../index.js";
import { createRemapper } from "../middleware/remap.js";
import { isSome } from "./is_some.js";
export function andThen(fn) {
    return createRemapper((_, inner) => {
        return isSome(inner) ? fn(inner.value) : NewOption.None();
    });
}
