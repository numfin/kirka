import { OptionUnion } from "../interfaces.js";

export function unwrapOr<T>(option: OptionUnion<T>, default_value: T) {
  return option.type === "None" ? default_value : option.value;
}
