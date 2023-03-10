import { OptionUnion } from "../interfaces";
import { NoneUnion } from "./NoneUnion";
import { SomeUnion } from "./SomeUnion";

export function take<T>(option: OptionUnion<T>) {
  if (option.type === "Some") {
    (option.type as "None") = "None";
    const value = option.value;
    (option.value as undefined) = undefined;
    return SomeUnion(value);
  }
  return NoneUnion<T>();
}
