import { ClonnableGenerator, WithIndex } from "./interfaces";

export const defaultFilter = <T>(_item: T) => true;
export const defaultMap = <T, U>(item: T): U => item as unknown as U;

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
export function* iterInfinite() {
  while (true) {
    yield;
  }
}
export function* iterEnumerate<T>(source: Iterable<T>) {
  let index = 0;
  for (const item of source) {
    yield { item, index } satisfies WithIndex<T>;
    index += 1;
  }
}
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

export function* iterCycle<T>(source: ClonnableGenerator<T>) {
  let iter = source();
  let firstValue = iter.next();
  if (firstValue.done) return;
  yield firstValue.value;

  while (true) {
    let nextValue = iter.next();
    if (nextValue.done) {
      iter = source();
    } else {
      yield nextValue.value;
    }
  }
}

export function* iterFlat<T>(source: Iterable<Iterable<T>>) {
  for (const item of source) {
    for (const subItem of item) {
      yield subItem;
    }
  }
}
