export function isEmpty<T>(source: Iterable<T>) {
  for (const _ of source) {
    return false;
  }
  return true;
}
