import { ResultUnion } from "../base.js";
import { ResultNew } from "../index.js";

export type ResultPipe<T, E, Out> = (
  option: ResultNew<T, E>,
  inner: ResultUnion<T, E>
) => Out;
