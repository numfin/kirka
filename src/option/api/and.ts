import { Option } from "../interfaces.js";
import { unionNone } from "./unionNone.js";

export function and<T, U>(current_value: Option<T>, new_value: Option<U>) {
  return current_value.isSome() ? new_value.inner() : unionNone<U>();
}
