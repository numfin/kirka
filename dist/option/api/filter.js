import { NewOption } from "../../index.js";
import { createRemapper } from "../middleware/remap.js";
import { isSomeAnd } from "./is_some_and.js";
export function filter(fn) {
    return createRemapper((option) => {
        if (option.do(isSomeAnd(fn))) {
            return option;
        }
        return NewOption.None();
    });
}
