import { OptionUnion } from "../interfaces";

export function format<T>(option: OptionUnion<T>) {
  return option.type === "Some" ? `Some(${option.value})` : `None`;
}
