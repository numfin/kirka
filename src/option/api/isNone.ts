import { None, OptionUnion } from "../interfaces";

export function isNone<T>(option: OptionUnion<T>): option is None {
  return option.type === "None";
}
