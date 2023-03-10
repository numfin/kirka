export function* iterTakeWhile<T>(
  source: Iterable<T>,
  filter: (item: T) => boolean
) {
  for (let item of source) {
    if (filter(item)) {
      yield item;
    } else {
      return;
    }
  }
}
