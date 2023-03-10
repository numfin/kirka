import { Option } from "../interfaces";
import { unionNone } from "./unionNone";

export function and<T, U>(current_value: Option<T>, new_value: Option<U>) {
  return current_value.isSome() ? new_value.inner() : unionNone<U>();
}
