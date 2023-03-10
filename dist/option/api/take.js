import { NoneUnion } from "./NoneUnion";
import { SomeUnion } from "./SomeUnion";
export function take(option) {
    if (option.type === "Some") {
        option.type = "None";
        const value = option.value;
        option.value = undefined;
        return SomeUnion(value);
    }
    return NoneUnion();
}
