export function* iterChain<T>(source: Iterable<T>, chainedItems: Iterable<T>) {
  for (const item of source) {
    yield item;
  }
  for (const item of chainedItems) {
    yield item;
  }
}
