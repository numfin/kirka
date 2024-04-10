import { iterChain } from "../generators/iterChain.js";

export function chain<T>(source: Iterable<T>, target: Iterable<T>) {
  return iterChain(source, target);
}
