import { Err } from "../interfaces.js";

export function unionErr<E>(value: E): Err<E> {
  return { value, type: "Err" };
}
