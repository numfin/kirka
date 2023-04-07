import { iterFlat } from "../generators/iterFlat.js";
export function flatMap(source, fn) {
    return iterFlat(source.map(fn));
}
