import { OptionUnion } from "../interfaces";

export function SomeUnion<T>(value: T): OptionUnion<T> {
  return { type: "Some", value };
}
