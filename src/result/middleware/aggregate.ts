import { ResultNew } from "../../index.js";
import { ResultUnion } from "../base.js";
import { ResultPipe } from "./middleware.js";

export type MiddlewareAggregator<T, E, Out> = (
  option: ResultNew<T, E>,
  inner: ResultUnion<T, E>
) => Out;

export function createAggregator<T, E, Out>(
  fn: ResultPipe<T, E, Out>
): MiddlewareAggregator<T, E, Out> {
  return (option, inner) => fn(option, inner);
}
