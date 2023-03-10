import { EitherUnion } from "../interfaces";

export function format<L, R>(either: EitherUnion<L, R>) {
  return `Either.${either.type}(${either.value})`;
}
