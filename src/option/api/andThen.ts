import { Option } from "../interfaces";
import { unionNone } from "./unionNone";

export function andThen<T, U>(option: Option<T>, fn: (value: T) => Option<U>) {
  return option.isSome() ? fn(option.unwrap()).inner() : unionNone<U>();
}
