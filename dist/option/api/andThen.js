import { unionNone } from "./unionNone";
export function andThen(option, fn) {
    return option.isSome() ? fn(option.unwrap()).inner() : unionNone();
}
