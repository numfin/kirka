import { OptionUnion } from "../interfaces.js";

export function unwrapOrElse<T>(
  option: OptionUnion<T>,
  default_fn: () => T
): T {
  return option.type === "None" ? default_fn() : option.value;
}
