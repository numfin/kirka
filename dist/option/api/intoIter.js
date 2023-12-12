import { IterFrom } from "../../index.js";
import { isSome } from "./isSome.js";
export function intoIter(option) {
    if (isSome(option)) {
        return IterFrom.array([option.value]);
    }
    return IterFrom.array([]);
}
