import { NoneUnion } from "./NoneUnion";
import { SomeUnion } from "./SomeUnion";
import { unwrap } from "./unwrap";
export function map(option, fn) {
    if (option.type === "Some") {
        return SomeUnion(fn(unwrap(option)));
    }
    return NoneUnion();
}
