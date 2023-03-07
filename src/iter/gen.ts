export const defaultFilter = <T>(item: T) => true;
export const defaultMap = <T, U>(item: T): U => item as unknown as U;
export const iterFactory = function* <T, U>(
  source: Iterable<T>,
  map = defaultMap<T, U>,
  filter = defaultFilter<U>
) {
  const check = (item: U) => filter(item);
  for (const item of source) {
    const mappedItem = map(item);
    if (check(mappedItem)) {
      yield mappedItem;
    } else {
      return;
    }
  }
};
