import { None } from "..";
export function filter(source, fn) {
    if (source.isSomeAnd(fn)) {
        return source;
    }
    return None();
}
