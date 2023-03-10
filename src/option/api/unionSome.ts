import { OptionUnion } from "../interfaces";

export function unionSome<T>(value: T): OptionUnion<T> {
  return { type: "Some", value };
}
