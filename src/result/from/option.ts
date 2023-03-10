import { Option } from "../../option";
import { Result } from "../interfaces";

export function option<T, E>(option: Option<T>, err: () => E): Result<T, E> {
  return option.result(err);
}
