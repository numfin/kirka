import { Option } from "../../option/interfaces.js";
import { Result } from "../interfaces.js";

export function option<T, E>(option: Option<T>, err: () => E): Result<T, E> {
  return option.result(err);
}
