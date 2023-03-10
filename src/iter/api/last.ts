import { None, Some } from "../../option";
import { Iter } from "../interfaces";

export function last<T>(source: Iter<T>) {
  return source.fold(None<T>(), (_, item) => Some(item));
}
