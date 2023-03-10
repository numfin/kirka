import { Result } from "../../result";

export function err<T, E>(result: Result<T, E>) {
  return result.err();
}
