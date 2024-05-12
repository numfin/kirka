import { IterPipe } from "./middleware.js";
import { Iter } from "../index.js";
import { ClonnableGenerator } from "../interfaces.js";

export type MiddlewareAggregator<In, Out> = (
  iter: Iter<In>,
  source: ClonnableGenerator<In>,
  inner: Generator<In, unknown, unknown>
) => Out;

export function createAggregator<In, Out>(
  fn: IterPipe<In, Out>
): MiddlewareAggregator<In, Out> {
  return (
    iter: Iter<In>,
    source: ClonnableGenerator<In>,
    inner: Generator<In, unknown, unknown>
  ) => fn(iter, source, inner);
}
