export function any<T>(source: Iterable<T>, fn: (item: T) => boolean) {
  for (let item of source) {
    if (fn(item)) {
      return true;
    }
  }
  return false;
}
