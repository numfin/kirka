import { ClonnableGenerator } from "../interfaces";
import { iterCycle } from "../gen";

export function cycle<T>(source: ClonnableGenerator<T>) {
  return iterCycle(source);
}
