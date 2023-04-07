import { Ok } from "../interfaces.js";

export function unionOk<T>(value: T): Ok<T> {
  return { value, type: "Ok" };
}
