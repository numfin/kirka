import { unionErr } from "./unionErr";
export function andThen(result, fn) {
    if (result.isOk()) {
        return fn(result.unwrap()).inner();
    }
    return unionErr(result.unwrapErr());
}
