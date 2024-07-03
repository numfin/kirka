import { NewOption } from "../../index.js";
import { createAggregator } from "../middleware/aggregate.js";
import { isNone } from "./is_none.js";
import { isSome } from "./is_some.js";

export function eq<T, U>(
  other: NewOption<T>,
  by = (x: T) => x as unknown as U
) {
  return createAggregator<T, boolean>((_, inner) => {
    if (isSome(inner) && isSome(other.inner)) {
      return by(inner.value) === by(other.inner.value);
    }
    return isNone(inner) && isNone(other.inner);
  });
}
