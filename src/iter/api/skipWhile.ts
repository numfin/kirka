import { iterSkipWhile } from "../generators/iterSkipWhile";

export function skipWhile<T>(source: Iterable<T>, fn: (item: T) => boolean) {
  return iterSkipWhile(source, fn);
}
