import { OptionUnion } from "../interfaces.js";
import { unionNone } from "./unionNone.js";
import { unionSome } from "./unionSome.js";

export function clone<T>(option: OptionUnion<T>) {
  return option.type === "Some" ? unionSome(option.value) : unionNone<T>();
}
