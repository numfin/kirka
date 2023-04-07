import { OptionUnion } from "../interfaces.js";

export function unionNone<T>(): OptionUnion<T> {
  return { type: "None" };
}
