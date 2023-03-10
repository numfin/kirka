import { Err } from "../interfaces";

export function unionErr<E>(value: E): Err<E> {
  return { value, type: "Err" };
}
