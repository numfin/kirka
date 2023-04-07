import { None, Some } from "../../option/index.js";
import { Iter } from "../interfaces.js";

export function last<T>(source: Iter<T>) {
  return source.fold(None<T>(), (_, item) => Some(item));
}
