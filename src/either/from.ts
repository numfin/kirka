import { Option } from "../option";
import { Either } from "./interfaces";

export namespace EitherFrom {
  export function optionLeft<L, R>(
    option: Option<L>,
    defaultRight: () => R
  ): Either<L, R> {
    return option.toLeft(defaultRight);
  }
  export function optionRight<L, R>(
    option: Option<R>,
    defaultLeft: () => L
  ): Either<L, R> {
    return option.toRight(defaultLeft);
  }
}
