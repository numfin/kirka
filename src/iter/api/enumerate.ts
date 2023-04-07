import { iterEnumerate } from "../generators/iterEnumerate.js";

export function enumerate<T>(source: Iterable<T>) {
  return iterEnumerate(source);
}
