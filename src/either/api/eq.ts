import { Either } from "../interfaces";

export function eq<L, R>(self: Either<L, R>, other: Either<L, R>) {
  const a = self.inner();
  const b = other.inner();
  return a.type === b.type && a.value === b.value;
}
