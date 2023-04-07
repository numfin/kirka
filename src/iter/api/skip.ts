import { Iter } from "../interfaces.js";

export function skip<T>(source: Iter<T>, skipAmount: number) {
  return source
    .enumerate()
    .skipWhile(({ index }) => index < skipAmount)
    .map(({ item }) => item);
}
