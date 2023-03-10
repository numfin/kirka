import { iterTakeWhile } from "../generators/iterTakeWhile";
export function takeWhile(source, fn) {
    return iterTakeWhile(source(), fn);
}
