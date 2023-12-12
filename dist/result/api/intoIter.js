import { IterFrom } from "../../index.js";
import { isOk } from "./isOk.js";
export function intoIter(result) {
    if (isOk(result)) {
        return IterFrom.array([result.value]);
    }
    return IterFrom.array([]);
}
