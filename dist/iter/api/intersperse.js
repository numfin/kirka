import { iterIntersperse } from "../generators/iterIntersperse.js";
export function intersperse(source, value) {
    return iterIntersperse(source, () => value);
}
