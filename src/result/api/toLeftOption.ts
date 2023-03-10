import { None, Option, Some } from "../../option";
import { Either } from "../interfaces";

export function toLeftOption<L, R>(either: Either<L, R>): Option<L> {
  return either.isLeft() ? Some(either.unwrap() as L) : None();
}
