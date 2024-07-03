import { ResultNew } from "../../index.js";
import { createRemapper } from "../middleware/remap.js";
import { isOk } from "./isOk.js";

export function or<T, E, E2>(otherResult: ResultNew<T, E2>) {
  return createRemapper<T, E, T, E2>((_, inner) => {
    return isOk(inner) ? ResultNew.Ok(inner.value) : otherResult;
  });
}
