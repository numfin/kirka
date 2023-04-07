import { Option } from "../interfaces.js";

export function isNoneAnd<T>(option: Option<T>, fn: () => boolean): boolean {
  return option.isNone() && fn();
}
