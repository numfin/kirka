import { unionOk } from "./unionOk.js";
import { unionErr } from "./unionErr.js";
export function mapErr(result, fn) {
    if (result.type === "Err") {
        return unionErr(fn(result.value));
    }
    else {
        return unionOk(result.value);
    }
}
