import { iterCycle } from "../generators/iterCycle.js";
import { ClonnableGenerator } from "../interfaces.js";

export function cycle<T>(source: ClonnableGenerator<T>) {
  return iterCycle(source);
}
