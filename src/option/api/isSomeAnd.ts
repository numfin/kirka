import { Option } from "../interfaces.js";

export function isSomeAnd<T>(
  option: Option<T>,
  fn: (value: T) => boolean
): boolean {
  return option.isSome() && fn(option.unwrap());
}
