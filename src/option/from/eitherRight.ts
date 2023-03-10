import { Either } from "../../result";

export function eitherRight<L, R>(either: Either<L, R>) {
  return either.toRightOption();
}
