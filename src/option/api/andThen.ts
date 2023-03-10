import { Option } from "../interfaces";
import { NoneUnion } from "./NoneUnion";

export function andThen<T, U>(option: Option<T>, fn: (value: T) => Option<U>) {
  return option.isSome() ? fn(option.unwrap()).inner() : NoneUnion<U>();
}
