import { iterTakeWhile } from "../generators/iterTakeWhile.js";
export function takeWhile(source, fn) {
    return iterTakeWhile(source, fn);
}
