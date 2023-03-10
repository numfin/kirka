export function* iterIntersperse<T>(source: Iterable<T>, fn: () => T) {
  let alreadyRan = false;
  for (const item of source) {
    if (alreadyRan) {
      yield fn();
    }
    yield item;
    alreadyRan = true;
  }
}
