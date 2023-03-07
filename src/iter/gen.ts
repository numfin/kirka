import { Some, None } from "../option";

export const defaultFilter = <T>(item: T, i: number) => true;
export const iterFactory = function* <T>(
  source: Iterable<T>,
  filter = defaultFilter
) {
  let i = 0;
  const check = (item: T, i: number) => filter(item, i);
  for (const item of source) {
    if (check(item, i + 1)) {
      yield item;
    } else {
      return;
    }
    i++;
  }
};
