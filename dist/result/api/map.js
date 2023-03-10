import { unionOk } from "./unionOk";
import { unionErr } from "./unionErr";
export function map(result, fn) {
    if (result.type === "Ok") {
        return unionOk(fn(result.value));
    }
    else {
        return unionErr(result.value);
    }
}
