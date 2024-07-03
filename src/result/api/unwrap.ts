import { createAggregator } from "../middleware/aggregate.js";
import { debug } from "./debug.js";
import { isErr } from "./isErr.js";

export function unwrap<T>() {
  return createAggregator<T, unknown, T>((_, inner) => {
    if (isErr(inner)) {
      throw new Error(`unwrap() on ${debug(inner)}`);
    }
    return inner.value;
  });
}
