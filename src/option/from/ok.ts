import { Result } from "../../result/index.js";
import { Option } from "../interfaces.js";

export function ok<T, E>(result: Result<T, E>): Option<T> {
  return result.ok();
}
