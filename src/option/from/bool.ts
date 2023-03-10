import { None, Some } from "..";
import { Option } from "../interfaces";

export function bool<T extends boolean>(v: T): Option<T> {
  return v ? Some(v) : None();
}
