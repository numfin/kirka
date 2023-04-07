import { None } from "../index.js";
import { Option } from "../interfaces.js";

export function filter<T>(source: Option<T>, fn: (item: T) => boolean) {
  if (source.isSomeAnd(fn)) {
    return source;
  }
  return None<T>();
}
