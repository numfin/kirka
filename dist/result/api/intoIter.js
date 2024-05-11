import { Iter } from "../../index.js";
import { isOk } from "./isOk.js";
export function intoIter(result) {
    if (isOk(result)) {
        return Iter.from([result.value]);
    }
    return Iter.from([]);
}
