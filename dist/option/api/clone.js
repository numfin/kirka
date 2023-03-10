import { unionNone } from "./unionNone";
import { unionSome } from "./unionSome";
export function clone(option) {
    return option.type === "Some" ? unionSome(option.value) : unionNone();
}
