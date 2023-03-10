import { Either, Left, Right } from "../../either";
import { Option } from "../interfaces";

export function toRight<L, R>(
  option: Option<R>,
  left_default: () => L
): Either<L, R> {
  return option.isSome() ? Right(option.unwrap()) : Left(left_default());
}
