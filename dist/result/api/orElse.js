import { ResultNew } from "../../index.js";
import { createRemapper } from "../middleware/remap.js";
import { isOk } from "./isOk.js";
export function orElse(remapErr) {
    return createRemapper((_, inner) => {
        return isOk(inner) ? ResultNew.Ok(inner.value) : remapErr(inner.err);
    });
}
