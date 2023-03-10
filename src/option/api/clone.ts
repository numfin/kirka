import { OptionUnion } from "../interfaces";
import { NoneUnion } from "./NoneUnion";
import { SomeUnion } from "./SomeUnion";

export function clone<T>(option: OptionUnion<T>) {
  return option.type === "Some" ? SomeUnion(option.value) : NoneUnion<T>();
}
