import { ResultNew } from "../../index.js";
import { createRemapper } from "../middleware/remap.js";
import { isOk } from "./isOk.js";
export function and(otherResult) {
    return createRemapper((_, inner) => {
        if (isOk(inner)) {
            return otherResult;
        }
        return ResultNew.Err(inner.err);
    });
}
