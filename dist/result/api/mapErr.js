import { ResultNew } from "../../index.js";
import { createRemapper } from "../middleware/remap.js";
import { isErr } from "./isErr.js";
export function mapErr(fn) {
    return createRemapper((_, inner) => {
        if (isErr(inner)) {
            return ResultNew.Err(fn(inner.err));
        }
        else {
            return ResultNew.Ok(inner.value);
        }
    });
}
