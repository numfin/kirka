import { ResultNew } from "../../index.js";
import { createRemapper } from "../middleware/remap.js";
import { isOk } from "./isOk.js";

export function orElse<T, E, E2>(remapErr: (value: E) => ResultNew<T, E2>) {
  return createRemapper<T, E, T, E2>((_, inner) => {
    return isOk(inner) ? ResultNew.Ok(inner.value) : remapErr(inner.err);
  });
}
