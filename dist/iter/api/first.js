import { None, Some } from "../../option/index.js";
export function first(source) {
    for (const item of source) {
        return Some(item);
    }
    return None();
}
