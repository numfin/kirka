import { iterFactory } from "../generators/iterFactory";
import { ClonnableGenerator } from "../interfaces";

export function filter<T>(
  source: ClonnableGenerator<T>,
  fn: (item: T) => boolean
) {
  return iterFactory(source(), (x) => x, fn);
}
