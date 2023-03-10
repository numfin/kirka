import { iterFactory } from "../generators/iterFactory";
import { ClonnableGenerator } from "../interfaces";

export function map<T, U>(source: ClonnableGenerator<T>, fn: (item: T) => U) {
  return iterFactory(source(), fn);
}
