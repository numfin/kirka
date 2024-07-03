import { ResultNew } from "../../index.js";
import { createRemapper } from "../middleware/remap.js";
import { isErr } from "./isErr.js";

export function mapErr<T, E, E2>(fn: (value: E) => E2) {
  return createRemapper<T, E, T, E2>((_, inner) => {
    if (isErr(inner)) {
      return ResultNew.Err(fn(inner.err));
    } else {
      return ResultNew.Ok(inner.value);
    }
  });
}
