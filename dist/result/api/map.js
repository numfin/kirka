import { unionOk } from "./unionOk.js";
import { unionErr } from "./unionErr.js";
export function map(result, fn) {
    if (result.type === "Ok") {
        return unionOk(fn(result.value));
    }
    else {
        return unionErr(result.value);
    }
}
