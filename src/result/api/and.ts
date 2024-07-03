import { ResultNew } from "../../index.js";
import { createRemapper } from "../middleware/remap.js";
import { isOk } from "./isOk.js";

export function and<T, E, T2>(otherResult: ResultNew<T2, E>) {
  return createRemapper<T, E, T2, E>((_, inner) => {
    if (isOk(inner)) {
      return otherResult;
    }
    return ResultNew.Err(inner.err);
  });
}
