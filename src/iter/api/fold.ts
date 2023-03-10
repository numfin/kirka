import { Iter } from "../interfaces";

export function fold<T, U>(
  source: Iter<T>,
  startFrom: U,
  fn: (acc: U, item: T) => U
): U {
  let lastAcc = startFrom;
  for (const item of source) {
    lastAcc = fn(lastAcc, item);
  }
  return lastAcc;
}
