import { ResultNew } from "../../index.js";
import { createRemapper } from "../middleware/remap.js";
import { isOk } from "./isOk.js";
export function or(otherResult) {
    return createRemapper((_, inner) => {
        return isOk(inner) ? ResultNew.Ok(inner.value) : otherResult;
    });
}
