import { EitherUnion } from "../interfaces";

export function unwrap<L, R>(either: EitherUnion<L, R>) {
  return either.value;
}
