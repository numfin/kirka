import { None, Some } from "../../option";
export function last(source) {
    return source.fold(None(), (_, item) => Some(item));
}
