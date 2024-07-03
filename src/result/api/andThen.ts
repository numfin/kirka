import { ResultNew } from "../../index.js";
import { createRemapper } from "../middleware/remap.js";
import { isOk } from "./isOk.js";

export function andThen<T, E, T2>(otherResult: (value: T) => ResultNew<T2, E>) {
  return createRemapper<T, E, T2, E>((_, inner) => {
    if (isOk(inner)) {
      return otherResult(inner.value);
    }
    return ResultNew.Err(inner.err);
  });
}
