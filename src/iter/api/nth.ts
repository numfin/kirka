import { Iter } from "../interfaces.js";

export function nth<T>(source: Iter<T>, amount: number) {
  if (amount <= 0) {
    throw new Error(`Cannot iterate ${amount} - 1 times`);
  }
  for (let i = 0; i < amount - 1; i++) {
    source.next();
  }
  return source.next();
}
