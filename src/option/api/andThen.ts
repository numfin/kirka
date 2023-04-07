import { Option } from "../interfaces.js";
import { unionNone } from "./unionNone.js";

export function andThen<T, U>(option: Option<T>, fn: (value: T) => Option<U>) {
  return option.isSome() ? fn(option.unwrap()).inner() : unionNone<U>();
}
