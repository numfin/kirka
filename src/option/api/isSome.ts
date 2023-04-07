import { OptionUnion, Some } from "../interfaces.js";

export function isSome<T>(option: OptionUnion<T>): option is Some<T> {
  return option.type === "Some";
}
