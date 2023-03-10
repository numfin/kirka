import { ClonnableGenerator } from "../interfaces";

export function all<T>(
  source: ClonnableGenerator<T>,
  fn: (item: T) => boolean
) {
  for (let item of source()) {
    if (!fn(item)) {
      return false;
    }
  }
  return true;
}
