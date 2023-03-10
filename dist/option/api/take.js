import { unionNone } from "./unionNone";
import { unionSome } from "./unionSome";
export function take(option) {
    if (option.type === "Some") {
        option.type = "None";
        const value = option.value;
        option.value = undefined;
        return unionSome(value);
    }
    return unionNone();
}
