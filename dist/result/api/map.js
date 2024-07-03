import { createRemapper } from "../middleware/remap.js";
import { isOk } from "./isOk.js";
import { ResultNew } from "../../index.js";
export function map(fn) {
    return createRemapper((_, inner) => {
        if (isOk(inner)) {
            return ResultNew.Ok(fn(inner.value));
        }
        else {
            return ResultNew.Err(inner.err);
        }
    });
}
