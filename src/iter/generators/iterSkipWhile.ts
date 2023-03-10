export function* iterSkipWhile<T>(
  source: Iterable<T>,
  filter: (item: T) => boolean
) {
  let flag = false;
  for (let item of source) {
    if (flag || !filter(item)) {
      flag = true;
      yield item;
    }
  }
}
