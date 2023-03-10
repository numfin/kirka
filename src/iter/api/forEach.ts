export function forEach<T>(source: Iterable<T>, fn: (item: T) => void) {
  for (const item of source) {
    fn(item);
  }
}
