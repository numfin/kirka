import { iterFlat } from "../gen";
export function flatMap(source, fn) {
    return iterFlat(source.map(fn));
}
