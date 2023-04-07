import { Option } from "../interfaces.js";
import { None, Some } from "../index.js";

export function nullable<T>(v?: T | null): Option<T> {
  if (v !== undefined && v !== null) {
    return Some(v);
  }
  return None();
}
