import { Result, Err, Ok } from "../../result";
import { Option } from "../interfaces";

export function result<T, E>(
  option: Option<T>,
  noneErr: () => E
): Result<T, E> {
  return option.isSome() ? Ok(option.unwrap()) : Err(noneErr());
}
