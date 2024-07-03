import { createRemapper } from "../middleware/remap.js";
import { isOk } from "./isOk.js";
import { ResultNew } from "../../index.js";

export function map<T, E, T2>(fn: (value: T) => T2) {
  return createRemapper<T, E, T2, E>((_, inner) => {
    if (isOk(inner)) {
      return ResultNew.Ok(fn(inner.value));
    } else {
      return ResultNew.Err(inner.err);
    }
  });
}
