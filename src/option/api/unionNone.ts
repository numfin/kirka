import { OptionUnion } from "../interfaces";

export function unionNone<T>(): OptionUnion<T> {
  return { type: "None" };
}
