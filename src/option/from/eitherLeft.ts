import { Either } from "../../either";
import { Option } from "../interfaces";

export function eitherLeft<L, R>(either: Either<L, R>): Option<L> {
  return either.toLeftOption();
}