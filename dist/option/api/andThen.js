import { unionNone } from "./unionNone.js";
export function andThen(option, fn) {
    return option.isSome() ? fn(option.unwrap()).inner() : unionNone();
}
