import { Either } from "../../either";

export function eitherRight<L, R>(either: Either<L, R>) {
  return either.toRightOption();
}
