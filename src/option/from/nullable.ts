import { Option } from "../interfaces";
import { None, Some } from "..";

export function nullable<T>(v?: T | null): Option<T> {
  if (v !== undefined && v !== null) {
    return Some(v);
  }
  return None();
}
