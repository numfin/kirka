import { NoneUnion } from "./NoneUnion";
export function andThen(option, fn) {
    return option.isSome() ? fn(option.unwrap()).inner() : NoneUnion();
}
