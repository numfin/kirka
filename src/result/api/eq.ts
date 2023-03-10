import { Result } from "../interfaces";

export function eq<T, E>(self: Result<T, E>, other: Result<T, E>) {
  const a = self.inner();
  const b = other.inner();
  return a.type === b.type && a.value === b.value;
}
