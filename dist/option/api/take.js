import { unionNone } from "./unionNone.js";
import { unionSome } from "./unionSome.js";
export function take(option) {
    if (option.type === "Some") {
        option.type = "None";
        const value = option.value;
        option.value = undefined;
        return unionSome(value);
    }
    return unionNone();
}
