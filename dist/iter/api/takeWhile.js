import { iterTakeWhile } from "../gen";
export function takeWhile(source, fn) {
    return iterTakeWhile(source(), fn);
}
