import { None, Some } from "../index.js";
export function nullable(v) {
    if (v !== undefined && v !== null) {
        return Some(v);
    }
    return None();
}
