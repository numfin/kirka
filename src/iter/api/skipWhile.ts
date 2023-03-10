import { ClonnableGenerator } from "../interfaces";
import { iterSkipWhile } from "../gen";

export function skipWhile<T>(
  source: ClonnableGenerator<T>,
  fn: (item: T) => boolean
) {
  return iterSkipWhile(source(), fn);
}
