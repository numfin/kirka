export function all<T>(source: Iterable<T>, fn: (item: T) => boolean) {
  for (let item of source) {
    if (!fn(item)) {
      return false;
    }
  }
  return true;
}
