import { ClonnableGenerator } from "../interfaces";
import { iterFactory } from "../gen";

export function filter<T>(
  source: ClonnableGenerator<T>,
  fn: (item: T) => boolean
) {
  return iterFactory(source(), (x) => x, fn);
}
