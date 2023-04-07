import { None, OptionUnion } from "../interfaces.js";

export function isNone<T>(option: OptionUnion<T>): option is None {
  return option.type === "None";
}
