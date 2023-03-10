import { Option } from "../interfaces";

export function orElse<T>(option: Option<T>, fn: () => Option<T>) {
  return option.isSome() ? option.inner() : fn().inner();
}
