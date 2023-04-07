import { Result } from "../../index.js";

export function err<T, E>(result: Result<T, E>) {
  return result.err();
}
