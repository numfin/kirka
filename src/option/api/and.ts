import { Option } from "../interfaces";
import { NoneUnion } from "./NoneUnion";

export function and<T, U>(current_value: Option<T>, new_value: Option<U>) {
  return current_value.isSome() ? new_value.inner() : NoneUnion<U>();
}
