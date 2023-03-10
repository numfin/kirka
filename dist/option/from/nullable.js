import { None, Some } from "..";
export function nullable(v) {
    if (v !== undefined && v !== null) {
        return Some(v);
    }
    return None();
}
