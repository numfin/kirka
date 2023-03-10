import { NoneUnion } from "./NoneUnion";
import { SomeUnion } from "./SomeUnion";
export function clone(option) {
    return option.type === "Some" ? SomeUnion(option.value) : NoneUnion();
}
