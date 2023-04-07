import { OptionUnion } from "../interfaces.js";
import { unionNone } from "./unionNone.js";
import { unionSome } from "./unionSome.js";

export function take<T>(option: OptionUnion<T>) {
  if (option.type === "Some") {
    (option.type as "None") = "None";
    const value = option.value;
    (option.value as undefined) = undefined;
    return unionSome(value);
  }
  return unionNone<T>();
}
