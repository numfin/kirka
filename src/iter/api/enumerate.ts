import { iterEnumerate } from "../generators/iterEnumerate";

export function enumerate<T>(source: Iterable<T>) {
  return iterEnumerate(source);
}
