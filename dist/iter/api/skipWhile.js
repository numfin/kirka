import { iterSkipWhile } from "../generators/iterSkipWhile";
export function skipWhile(source, fn) {
    return iterSkipWhile(source(), fn);
}
