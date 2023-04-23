import { Option } from "../interfaces.js";

export function match<T, U>(
  source: Option<T>,
  onSome: (v: T) => U,
  onNone: () => U
): U {
  return source.map(onSome).unwrapOrElse(onNone);
}
