import { Iter } from "../interfaces.js";
import { Option } from "../../option/index.js";

export function position<T>(
  source: Iter<T>,
  fn: (item: T) => boolean
): Option<number> {
  return source
    .enumerate()
    .find(({ item }) => fn(item))
    .map(({ index }) => index);
}
