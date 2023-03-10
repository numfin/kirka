import { EitherUnion, Left } from "../interfaces";

export function isLeft<L, R>(either: EitherUnion<L, R>): either is Left<L> {
  return either.type === "Left";
}
