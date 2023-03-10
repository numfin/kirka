import { ClonnableGenerator } from "../interfaces";

export function any<T>(
  source: ClonnableGenerator<T>,
  fn: (item: T) => boolean
) {
  for (let item of source()) {
    if (fn(item)) {
      return true;
    }
  }
  return false;
}
