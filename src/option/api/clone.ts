import { OptionUnion } from "../interfaces";
import { unionNone } from "./unionNone";
import { unionSome } from "./unionSome";

export function clone<T>(option: OptionUnion<T>) {
  return option.type === "Some" ? unionSome(option.value) : unionNone<T>();
}
