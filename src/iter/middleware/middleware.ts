import { Iter } from "../index.js";
import { ClonnableGenerator } from "../interfaces.js";

export type IterPipe<In, Out> = (
  iter: Iter<In>,
  source: ClonnableGenerator<In>,
  inner: Generator<In, unknown, unknown>
) => Out;
