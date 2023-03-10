import { Iter } from "../interfaces";
import { None, Option, Some } from "../../option";

export function find<T>(source: Iter<T>, fn: (item: T) => boolean): Option<T> {
  const result = source
    .skipWhile((item) => !fn(item))
    .take(1)
    .collect();
  return result.length > 0 ? Some(result[0]) : None();
}
