import { toIterable } from "./toIterable.js";
export function flatten(source) {
    return source.map(toIterable).flatMap((v) => v);
}
