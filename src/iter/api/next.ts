import { None, Option, Some } from "../../option/index.js";

export function next<T>(source: Generator<T>): Option<T> {
  const nextValue = source.next();
  if (nextValue.done) {
    return None();
  } else {
    return Some(nextValue.value);
  }
}
