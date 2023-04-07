import { None, Option, Some } from "../../option/index.js";
import { Result } from "../interfaces.js";

export function ok<T, E>(result: Result<T, E>): Option<T> {
  return result.isOk() ? Some(result.inner().value as T) : None();
}
