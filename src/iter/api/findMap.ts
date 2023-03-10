import { Iter } from "../interfaces";
import { None, Option } from "../../option";

export function findMap<T, U>(
  source: Iter<T>,
  fn: (item: T) => Option<U>
): Option<U> {
  const result = source
    .map(fn)
    .skipWhile((v) => v.isNone())
    .take(1)
    .collect();
  return result.length > 0 ? result[0] : None();
}
