import { Ok } from "../interfaces";

export function unionOk<T>(value: T): Ok<T> {
  return { value, type: "Ok" };
}
