import { ResultNew } from "../../index.js";

export function tryFn<T, E>(fn: () => T) {
  try {
    return ResultNew.Ok(fn());
  } catch (err) {
    return ResultNew.Err(err as E);
  }
}
