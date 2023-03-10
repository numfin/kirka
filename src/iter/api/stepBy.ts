import { Iter } from "../interfaces";

export function stepBy<T>(source: Iter<T>, amount: number) {
  if (amount <= 0) {
    throw new Error(`.stepBy() amount should be > 0`);
  }

  return source
    .enumerate()
    .filter(({ index }) => index === 0 || index % amount === 0)
    .map(({ item }) => item);
}
