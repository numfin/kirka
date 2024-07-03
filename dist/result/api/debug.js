import { isOk } from "./isOk.js";
export function debug(inner, { ok = (v) => v, err = (e) => e } = {}) {
    return `Result.${inner.type}(${isOk(inner) ? ok(inner.value) : err(inner.err)})`;
}
