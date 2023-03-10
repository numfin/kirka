import { iterTakeWhile } from "../generators/iterTakeWhile";
import { ClonnableGenerator } from "../interfaces";

export function takeWhile<T>(
  source: ClonnableGenerator<T>,
  fn: (item: T) => boolean
) {
  return iterTakeWhile(source(), fn);
}
