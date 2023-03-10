import { ClonnableGenerator } from "../interfaces";
import { iterTakeWhile } from "../gen";

export function takeWhile<T>(
  source: ClonnableGenerator<T>,
  fn: (item: T) => boolean
) {
  return iterTakeWhile(source(), fn);
}
