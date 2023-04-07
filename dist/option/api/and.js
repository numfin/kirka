import { unionNone } from "./unionNone.js";
export function and(current_value, new_value) {
    return current_value.isSome() ? new_value.inner() : unionNone();
}
