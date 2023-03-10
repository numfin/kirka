import { Result } from "../../result";
import { Option } from "../interfaces";

export function ok<T, E>(result: Result<T, E>): Option<T> {
  return result.ok();
}
