import { iterFlat } from "../generators/iterFlat";
export function flatMap(source, fn) {
    return iterFlat(source.map(fn));
}
