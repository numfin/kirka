import { EitherUnion, Right } from "../interfaces";

export function isRight<L, R>(either: EitherUnion<L, R>): either is Right<R> {
  return either.type === "Right";
}
