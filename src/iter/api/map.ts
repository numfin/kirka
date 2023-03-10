import { ClonnableGenerator } from "../interfaces";
import { iterFactory } from "../gen";

export function map<T, U>(source: ClonnableGenerator<T>, fn: (item: T) => U) {
  return iterFactory(source(), fn);
}
