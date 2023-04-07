import { None, Some } from "../index.js";
import { Option } from "../interfaces.js";

export function bool<T extends boolean>(v: T): Option<T> {
  return v ? Some(v) : None();
}
