import { None, Some } from "../../option/index.js";
export function find(source, fn) {
    const result = source
        .skipWhile((item) => !fn(item))
        .take(1)
        .collect();
    return result.length > 0 ? Some(result[0]) : None();
}
