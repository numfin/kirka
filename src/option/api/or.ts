import { Option } from "../interfaces";

export function or<T>(current_value: Option<T>, new_value: Option<T>) {
  return current_value.isSome() ? current_value.inner() : new_value.inner();
}
