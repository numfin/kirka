import { OptionUnion } from "../interfaces.js";

export function unionSome<T>(value: T): OptionUnion<T> {
  return { type: "Some", value };
}
