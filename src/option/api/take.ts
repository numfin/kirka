import { OptionUnion } from "../interfaces";
import { unionNone } from "./unionNone";
import { unionSome } from "./unionSome";

export function take<T>(option: OptionUnion<T>) {
  if (option.type === "Some") {
    (option.type as "None") = "None";
    const value = option.value;
    (option.value as undefined) = undefined;
    return unionSome(value);
  }
  return unionNone<T>();
}
