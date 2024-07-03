import { ResultNew } from "../../index.js";
import { createAggregator } from "../middleware/aggregate.js";
import { isErr } from "./isErr.js";
import { isOk } from "./isOk.js";

export function eq<T, E>(other: ResultNew<T, E>) {
  return createAggregator((_, inner) => {
    if (isOk(inner) && inner.type === other.inner.type) {
      return inner.value === other.inner.value;
    }
    if (isErr(inner) && inner.type === other.inner.type) {
      return inner.err === other.inner.err;
    }
    return false;
  });
}
