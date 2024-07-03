import { Iter } from "../../index.js";
import { isSome } from "./is_some.js";
export function intoIter(option) {
    if (isSome(option)) {
        return Iter.from([option.value]);
    }
    return Iter.from([]);
}
