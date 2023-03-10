import { None, Some } from "../../option";

export function first<T>(source: Iterable<T>) {
  for (const item of source) {
    return Some(item);
  }
  return None<T>();
}
