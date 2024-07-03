import { NewOption } from "../index.js";
import { None, Some } from "../base.js";
import { OptionPipe } from "./middleware.js";

export type MiddlewareAggregator<In, Out> = (
  option: NewOption<In>,
  inner: Some<In> | None
) => Out;

export function createAggregator<In, Out>(
  fn: OptionPipe<In, Out>
): MiddlewareAggregator<In, Out> {
  return (option, inner) => fn(option, inner);
}
