import { unionErr } from "./unionErr.js";
export function andThen(result, fn) {
    if (result.isOk()) {
        return fn(result.unwrap()).inner();
    }
    return unionErr(result.unwrapErr());
}
