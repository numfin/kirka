import { iterIntersperse } from "../generators/iterIntersperse";
export function intersperse(source, value) {
    return iterIntersperse(source, () => value);
}
