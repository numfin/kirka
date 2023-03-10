import { iterTakeWhile } from "../generators/iterTakeWhile";

export function takeWhile<T>(source: Iterable<T>, fn: (item: T) => boolean) {
  return iterTakeWhile(source, fn);
}
