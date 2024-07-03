import { ResultNew } from "../../index.js";
import { ResultUnion } from "../base.js";
import { ResultPipe } from "./middleware.js";

export type MiddlewareRemap<T, E, T2, E2> = (
  option: ResultNew<T, E>,
  inner: ResultUnion<T, E>
) => ResultNew<T2, E2>;

export function createRemapper<T, E, T2, E2>(
  fn: ResultPipe<T, E, ResultNew<T2, E2>>
): MiddlewareRemap<T, E, T2, E2> {
  return (option, inner) => fn(option, inner);
}
