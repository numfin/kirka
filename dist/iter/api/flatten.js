import { toIterable } from "./toIterable";
export function flatten(source) {
    return source.map(toIterable).flatMap((v) => v);
}
