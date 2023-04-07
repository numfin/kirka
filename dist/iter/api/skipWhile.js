import { iterSkipWhile } from "../generators/iterSkipWhile.js";
export function skipWhile(source, fn) {
    return iterSkipWhile(source, fn);
}
