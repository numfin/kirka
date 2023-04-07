import { None } from "../../option/index.js";
export function findMap(source, fn) {
    const result = source
        .map(fn)
        .skipWhile((v) => v.isNone())
        .take(1)
        .collect();
    return result.length > 0 ? result[0] : None();
}
