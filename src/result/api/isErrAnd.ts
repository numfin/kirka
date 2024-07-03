import { createAggregator } from "../middleware/aggregate.js";
import { isErr } from "./isErr.js";

export function isErrAnd<E>(fn: (err: E) => boolean) {
  return createAggregator<unknown, E, boolean>((_, inner) => {
    return isErr(inner) && fn(inner.err);
  });
}
