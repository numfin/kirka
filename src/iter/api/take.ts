import { Iter } from "../interfaces.js";

export function take<T>(source: Iter<T>, takeAmount: number) {
  return source
    .enumerate()
    .takeWhile(({ index }) => index < takeAmount)
    .map(({ item }) => item);
}
