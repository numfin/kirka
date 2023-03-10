import { None, Some } from "../../option";
export function first(source) {
    for (const item of source) {
        return Some(item);
    }
    return None();
}
