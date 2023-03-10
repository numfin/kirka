import { Either, Left, Right } from "../../either";
import { Option } from "../interfaces";

export function toLeft<T, R>(
  option: Option<T>,
  right_default: () => R
): Either<T, R> {
  return option.isSome() ? Left(option.unwrap()) : Right(right_default());
}
