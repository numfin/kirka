import { createAggregator } from "../middleware/aggregate.js";
import { isErr } from "./isErr.js";

export function unwrapErrOr<E>(defaultErr: E) {
  return createAggregator<unknown, E, E>((_, inner) => {
    return isErr(inner) ? inner.err : defaultErr;
  });
}
