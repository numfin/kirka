import { Iter } from "../interfaces.js";
import { Option } from "../../option/index.js";

export function filterMap<T, U>(source: Iter<T>, fn: (item: T) => Option<U>) {
  return source
    .map(fn)
    .filter((v) => v.isSome())
    .map((v) => v.unwrap());
}
