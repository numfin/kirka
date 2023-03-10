import { None, OptionUnion } from "../interfaces";

export function isNone<T>(option: OptionUnion<T>): option is None<T> {
  return option.type === "None";
}
