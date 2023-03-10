import { Option } from "../../option";
import { Either } from "../interfaces";

export function optionLeft<L, R>(
  option: Option<L>,
  defaultRight: () => R
): Either<L, R> {
  return option.toLeft(defaultRight);
}
