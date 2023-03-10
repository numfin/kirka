import { iterSkipWhile } from "../generators/iterSkipWhile";
import { ClonnableGenerator } from "../interfaces";

export function skipWhile<T>(
  source: ClonnableGenerator<T>,
  fn: (item: T) => boolean
) {
  return iterSkipWhile(source(), fn);
}
