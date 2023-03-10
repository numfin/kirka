import { None, Option, Some } from "../../option";
import { Either } from "../interfaces";

export function toRightOption<L, R>(either: Either<L, R>): Option<R> {
  return either.isRight() ? Some(either.unwrap() as R) : None();
}
