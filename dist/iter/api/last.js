import { None, Some } from "../../option/index.js";
export function last(source) {
    return source.fold(None(), (_, item) => Some(item));
}
