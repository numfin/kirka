import { unionOk } from "./unionOk";
import { unionErr } from "./unionErr";
export function mapErr(result, fn) {
    if (result.type === "Err") {
        return unionErr(fn(result.value));
    }
    else {
        return unionOk(result.value);
    }
}
