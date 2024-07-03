import { Iter } from "../index.js";
export function createRemapper(fn) {
    return (iter, source, inner) => new Iter(() => fn(iter, source, inner));
}
