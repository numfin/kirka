import { None, Some } from "../../option/index.js";
import { Option } from "../../option/interfaces.js";
import { Result } from "../interfaces.js";

export function err<T, E>(result: Result<T, E>): Option<E> {
  return result.isErr() ? Some(result.unwrapErr()) : None();
}
