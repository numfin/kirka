import { ResultNew } from "../../index.js";
import { createRemapper } from "../middleware/remap.js";
import { isOk } from "./isOk.js";
export function andThen(otherResult) {
    return createRemapper((_, inner) => {
        if (isOk(inner)) {
            return otherResult(inner.value);
        }
        return ResultNew.Err(inner.err);
    });
}
