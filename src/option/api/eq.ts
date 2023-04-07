import { Option } from "../interfaces.js";

export function eq<T, U>(
  option: Option<T>,
  value: Option<T>,
  by = (x: T) => x as unknown as U
) {
  if (value.isNone() || option.isNone()) {
    return value.isNone() && option.isNone();
  }
  return by(value.unwrap()) === by(option.unwrap());
}
