import { iterIntersperse } from "../generators/iterIntersperse";

export function intersperse<T>(source: Iterable<T>, value: T) {
  return iterIntersperse(source, () => value);
}
