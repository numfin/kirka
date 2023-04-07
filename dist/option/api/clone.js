import { unionNone } from "./unionNone.js";
import { unionSome } from "./unionSome.js";
export function clone(option) {
    return option.type === "Some" ? unionSome(option.value) : unionNone();
}
