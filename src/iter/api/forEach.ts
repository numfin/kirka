import { Iter } from "../interfaces";

export function forEach<T>(source: Iter<T>, fn: (item: T) => void) {
  for (const item of source) {
    fn(item);
  }
}
