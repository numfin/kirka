import { createAggregator } from "../middleware/aggregate.js";
import { isOk } from "./isOk.js";

export function unwrapOr<T>(default_value: T) {
  return createAggregator<T, unknown, T>((_, inner) => {
    return isOk(inner) ? inner.value : default_value;
  });
}
