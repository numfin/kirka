import { OptionUnion } from "../interfaces";

export function NoneUnion<T>(): OptionUnion<T> {
  return { type: "None" };
}
