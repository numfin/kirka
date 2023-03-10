import { iterSkipWhile } from "../gen";
export function skipWhile(source, fn) {
    return iterSkipWhile(source(), fn);
}
