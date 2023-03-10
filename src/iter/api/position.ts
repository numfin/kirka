import { Iter } from "../interfaces";
import { Option } from "../../option";

export function position<T>(
  source: Iter<T>,
  fn: (item: T) => boolean
): Option<number> {
  return source
    .enumerate()
    .find(({ item }) => fn(item))
    .map(({ index }) => index);
}
