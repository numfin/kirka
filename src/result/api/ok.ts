import { None, Option, Some } from "../../option";
import { Result } from "../interfaces";

export function ok<T, E>(result: Result<T, E>): Option<T> {
  return result.isOk() ? Some(result.inner().value as T) : None();
}
