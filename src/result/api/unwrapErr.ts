import { createAggregator } from "../middleware/aggregate.js";
import { debug } from "./debug.js";
import { isOk } from "./isOk.js";

export function unwrapErr<E>() {
  return createAggregator<unknown, E, E>((_, inner) => {
    if (isOk(inner)) {
      throw new Error(`unwrapErr called on ${debug(inner)}`);
    }
    return inner.err;
  });
}
