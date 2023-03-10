import { WithIndex } from "../interfaces";

export function* iterEnumerate<T>(source: Iterable<T>) {
  let index = 0;
  for (const item of source) {
    yield { item, index } satisfies WithIndex<T>;
    index += 1;
  }
}
