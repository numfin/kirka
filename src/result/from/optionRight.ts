import { Option } from "../../option";
import { Either } from "../interfaces";

export function optionRight<L, R>(
  option: Option<R>,
  defaultLeft: () => L
): Either<L, R> {
  return option.toRight(defaultLeft);
}
