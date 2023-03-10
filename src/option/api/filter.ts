import { None } from "..";
import { Option } from "../interfaces";

export function filter<T>(source: Option<T>, fn: (item: T) => boolean) {
  if (source.isSomeAnd(fn)) {
    return source;
  }
  return None<T>();
}
