import { NewOption } from "../../option/index.js";

export function next<T>(source: Generator<T>): NewOption<T> {
  const nextValue = source.next();
  if (nextValue.done) {
    return NewOption.None();
  } else {
    return NewOption.Some(nextValue.value);
  }
}
