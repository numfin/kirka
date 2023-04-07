import { None } from "../../option/index.js";
import { Iter } from "../interfaces.js";

export function get<T>(source: Iter<T>, index: number) {
  if (index < 0) {
    return None<T>();
  }
  return source.skip(index).first();
}
