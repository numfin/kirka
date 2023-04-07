import { Option } from "../interfaces.js";

export function orElse<T>(option: Option<T>, fn: () => Option<T>) {
  return option.isSome() ? option.inner() : fn().inner();
}
