import { Result, Err, Ok } from "../../result/index.js";
import { Option } from "../interfaces.js";

export function result<T, E>(
  option: Option<T>,
  noneErr: () => E
): Result<T, E> {
  return option.isSome() ? Ok(option.unwrap()) : Err(noneErr());
}
