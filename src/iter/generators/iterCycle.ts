import { ClonnableGenerator } from "../interfaces";

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
