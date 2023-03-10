import { iterCycle } from "../generators/iterCycle";
import { ClonnableGenerator } from "../interfaces";

export function cycle<T>(source: ClonnableGenerator<T>) {
  return iterCycle(source);
}
