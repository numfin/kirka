import { defaultMap } from "./defaultMap.js";
import { defaultFilter } from "./defaultFilter.js";

export function* iterFactory<T, U = T>(
  source: Iterable<T>,
  map = defaultMap<T, U>,
  filter = defaultFilter<U>
) {
  const check = (item: U) => filter(item);
  for (const item of source) {
    const mappedItem = map(item);
    if (check(mappedItem)) {
      yield mappedItem;
    }
  }
}
