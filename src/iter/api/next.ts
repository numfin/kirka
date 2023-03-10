import { None, Option, Some } from "../../option";

export function next<T>(generator: Generator<T>): Option<T> {
  const current = generator.next();
  return current.done ? None() : Some(current.value);
}
