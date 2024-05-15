import { Iter } from "../../index.js";
import { isSome } from "./isSome.js";
export function intoIter(option) {
    if (isSome(option)) {
        return Iter.from([option.value]);
    }
    return Iter.from([]);
}
