import { None, Option, Some } from "../../option";
import { Result } from "../interfaces";

export function err<T, E>(result: Result<T, E>): Option<E> {
  return result.isErr() ? Some(result.unwrapErr()) : None();
}
